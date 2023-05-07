import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {User} from "../../interfaces/user";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map} from "rxjs";
import {MusicParams} from "../../interfaces/musicParams";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {faSpotify} from "@fortawesome/free-brands-svg-icons/";


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {
  faSpotify = faSpotify
  public user!: User
  watchId: number;
  timingId: any;
  startTime: number;
  timePassed: string;
  totalRunTime: Date;
  distanceTraveled: number;
  previousPosition: any;
  error: string
  playListUrl: SafeResourceUrl
  params: MusicParams

  constructor(public authService: AuthServiceService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnDestroy(): void {
    navigator.geolocation.clearWatch(this.watchId);
    clearInterval(this.timingId)
  }

  ngOnInit(): void {
    const userValue = localStorage.getItem('user') || ''
    this.user = JSON.parse(userValue)
    this.authService.user = this.user

    this.route.queryParams.pipe(
      map((params: Params) => {
        const musicParams: MusicParams = {
          emotion: params['emotion'],
          beat: params['beat'],
          genre: params['genre'],
        };
        return musicParams;
      })
    ).subscribe((params: MusicParams) => {
      this.params = params
      this.chosePlaylist(params)
    })

  }

  startTracking() {
    this.startTime = Date.now();
    this.distanceTraveled = 0;

    this.timingId = setInterval(() => {
      const timeDifference = Date.now() - this.startTime;
      const secondsPassed = Math.floor(timeDifference / 1000);
      const minutesPassed = Math.floor(secondsPassed / 60);
      const hoursPassed = Math.floor(minutesPassed / 60);

      this.timePassed = `${hoursPassed}h ${minutesPassed % 60}m ${secondsPassed % 60}s`;
    }, 1000);

    this.watchId = navigator.geolocation.watchPosition(
      position => {
        // Calculate the distance traveled
        if (position.coords && position.coords.latitude && position.coords.longitude) {
          if (this.previousPosition) {
            const distance = this.calculateDistance(this.previousPosition.coords.latitude, this.previousPosition.coords.longitude, position.coords.latitude, position.coords.longitude);
            this.distanceTraveled += distance;
          }
          this.previousPosition = position;
        }
      },
      error => {
        this.error = 'Please allow geolocation'
        console.error('Error getting location', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  stopTracking() {
    navigator.geolocation.clearWatch(this.watchId);
    clearInterval(this.timingId)

    console.log('time', this.timePassed)
    console.log('distance', this.distanceTraveled)
    this.watchId = 0;
    this.previousPosition = null;

    setInterval(() => {
      this.router.navigateByUrl('/overview')
    }, 5000)
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadius = 6371e3; // meters
    const phi1 = this.toRadians(lat1);
    const phi2 = this.toRadians(lat2);
    const deltaPhi = this.toRadians(lat2 - lat1);
    const deltaLambda = this.toRadians(lon2 - lon1);

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  }

  private toRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }

  private chosePlaylist(params: MusicParams) {
    switch (params.emotion.toLowerCase()) {
      case "motivated":
        switch (params.beat.toLowerCase()) {
          case "easy":
            this.playListUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://open.spotify.com/playlist/3OvIV4loPsLKwWIcmsQVaj?si=4c06dea0a3be43be")
            break
          case "medium":
            this.playListUrl = "https://open.spotify.com/playlist/3vITjiFgGpV98vLoawO7rk?si=f60f4870429747c9"
            break
          case "hard":
            this.playListUrl = "https://open.spotify.com/playlist/0Ejv8hGuHMYU4MS5MaGncJ?si=cdb63f7fca1a4140v"
            break
        }
        break

      case "physically exhausted":
        switch (params.beat.toLowerCase()) {
          case "easy":
            this.playListUrl = "https://open.spotify.com/playlist/7GbWqnAZI3cnu85bx96dxr?si=7448e6857f4446d2"
            break
          case "medium":
            this.playListUrl = "https://open.spotify.com/playlist/0S0FHLZ7Y0kNPKmSW35pZD?si=10b43ea86d054278"
            break
          case "hard":
            this.playListUrl = "https://open.spotify.com/playlist/4OCqt3LgvWDUQE6BtntMjm?si=c67d3464ce784e1d"
            break
        }
        break

      case "mentally exhausted":
        switch (params.beat.toLowerCase()) {
          case "easy":
            this.playListUrl = "https://open.spotify.com/playlist/4lKA3ZjSGIwwh5GdfdVCFD?si=0c547d979fb644cc"
            break
          case "medium":
            this.playListUrl = "https://open.spotify.com/playlist/4tFRKS1us3gtqnzoe8GfBD?si=63b88879f92441ff"
            break
          case "hard":
            this.playListUrl = "https://open.spotify.com/playlist/6HfPnrriIYkJnEkVu73wR9?si=9a0376f07c674765"
            break

        }
        break

      default:
        this.playListUrl = "https://open.spotify.com/playlist/6FuVaXJvnRAQRR0aakV8PH?si=e6d2e9bb04f84aff"
    }
  }
}

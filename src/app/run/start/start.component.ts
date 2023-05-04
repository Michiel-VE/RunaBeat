import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";
import {Subscriber} from "rxjs";
import {Quote} from "../../interfaces/quote";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {
  public user!: User
  watchId: number;
  timingId: any;
  startTime: number;
  timePassed: string;
  totalRunTime: Date;
  distanceTraveled: number;
  previousPosition: any;
  error: string

  constructor(public authService: AuthServiceService, private router:Router) {
  }

  ngOnDestroy(): void {
    navigator.geolocation.clearWatch(this.watchId);
    clearInterval(this.timingId)
  }

  ngOnInit(): void {
    const userValue = localStorage.getItem('user') || ''
    this.user = JSON.parse(userValue)
    this.authService.user = this.user
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

    setInterval(()=> {
      this.router.navigateByUrl('/overview')
    },5000)
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
}

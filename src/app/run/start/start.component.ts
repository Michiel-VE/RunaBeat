import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  watchId: number;
  startTime: Date;
  stopTime: Date;
  totalRunTime: Date;
  distanceTraveled: number;
  previousPosition: any;
  error: string

  constructor() {
  }

  ngOnInit(): void {
  }

  startTracking() {
    this.startTime = new Date();
    this.distanceTraveled = 0;

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
    this.stopTime = new Date();
    this.totalRunTime = new Date(this.stopTime.getTime() - this.startTime.getTime());

    console.log('time', this.totalRunTime.getSeconds())
    console.log('distance', this.distanceTraveled)
    this.watchId = 0;
    this.previousPosition = null;
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

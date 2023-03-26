import {Component, OnInit} from '@angular/core';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";
import {AuthServiceService} from "../../services/auth-service.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public user!: User
  friends = []
  faAdd = faPlusCircle


  constructor(private router: Router, private authService: AuthServiceService) {
  }

  async ngOnInit() {
    const userValue = localStorage.getItem('user') || ''
    this.user = JSON.parse(userValue)
    this.authService.user = this.user

    const snapshot = await firebase.firestore().collection(`friends`).doc(String(this.authService.user.uid)).get();
    // @ts-ignore
    const list = Object.values(snapshot.data())
    this.friends = list[0]
  }

  addFriends() {
    this.router.navigateByUrl('/addFriend')
  }

}

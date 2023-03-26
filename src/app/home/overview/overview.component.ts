import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthServiceService} from "../../services/auth-service.service";
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Input() user: User
  @Input() addFriends: boolean

  friendsList: User[] = []

  constructor(private afs: AngularFirestore, private authService: AuthServiceService) {
  }

  ngOnInit(): void {
  }

  async addUser(user: User) {
    const snapshot = await firebase.firestore().collection(`friends`).doc(String(this.authService.user.uid)).get();

    if (snapshot.data()) {
      // @ts-ignore
      const list = Object.values(snapshot.data())

      list[0].push(user)
      this.friendsList = list[0]

    } else {
      this.friendsList.push(user)
    }

    const arr = this.friendsList

    await this.afs.doc(`friends/${this.authService.user.uid}`).set({arr})
  }

  async getActivity(userId: String) {

    const snapshot = await firebase.firestore().collection(`activities`).doc(String(userId)).get();
  }
}

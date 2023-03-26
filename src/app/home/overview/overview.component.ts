import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
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
    console.log('before', this.friendsList)
    const snapshot = await firebase.firestore().collection(`friends`).doc(String(this.authService.user.uid)).get();
    console.log('before snapshot', snapshot.data())


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

}

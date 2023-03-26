import {Component, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {User} from "../../interfaces/user";
import {AuthServiceService} from "../../services/auth-service.service";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  users: User[] = []

  constructor(private authService: AuthServiceService) {
  }

  ngOnInit(): void {
    const userValue = localStorage.getItem('user')
    this.authService.user = userValue !== null ? JSON.parse(userValue) : this.users
    this.getAllUsers()
  }

  private async getAllUsers() {
    const snapshot = await firebase.firestore().collection('users').get()
    snapshot.docs.map(doc => {
      if (doc.data()['uid'] !== this.authService.user.uid) {
        this.users.push(<User>doc.data())
      }
    })
  }
}

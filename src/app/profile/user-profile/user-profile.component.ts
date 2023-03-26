import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {User} from "../../interfaces/user";
import {user} from "@angular/fire/auth";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user!: User
  dateForm = new FormGroup({
    birthday: new FormControl('')
  });
  public formBuilder: FormBuilder
  readonly birthdayFormGroupName = 'birthday'

  constructor(public authService: AuthServiceService) {
  }

  ngOnInit(): void {
    const userValue = localStorage.getItem('user') || ''
    this.user = JSON.parse(userValue)
    this.authService.user = this.user
  }

}

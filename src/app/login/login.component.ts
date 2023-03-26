import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle

  constructor(public authService: AuthServiceService) {
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faHouse= faHome
  faUser= faUser

  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
  }

}

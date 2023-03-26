import {Component, OnInit} from '@angular/core';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  friends = []
  faAdd = faPlusCircle


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  addFriends() {
    this.router.navigateByUrl('/addFriend')
  }

}

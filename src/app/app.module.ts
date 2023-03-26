import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './home/landing/landing.component';
import {OverviewComponent} from './home/overview/overview.component';
import {AppRoutingModule} from './app-routing.module';
import {NavComponent} from './nav/nav.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FIREBASE_OPTIONS} from '@angular/fire/compat';
import {environment, firebaseConfig} from "../environments/environment";
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AddFriendComponent } from './home/add-friend/add-friend.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    OverviewComponent,
    NavComponent,
    UserProfileComponent,
    AddFriendComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: firebaseConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

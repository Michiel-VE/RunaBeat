import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./home/landing/landing.component";
import {LoginComponent} from "./login/login.component";
import {AuthguardGuard} from "./services/authguard.guard";
import {UserProfileComponent} from "./profile/user-profile/user-profile.component";
import {AddFriendComponent} from "./home/add-friend/add-friend.component";
import {QuestionComponent} from "./run/question/question.component";
import {StartComponent} from "./run/start/start.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'overview', component: LandingComponent, canActivate: [AuthguardGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthguardGuard]},
  {path: 'addFriend', component: AddFriendComponent, canActivate: [AuthguardGuard]},
  {path: 'quiz', component: QuestionComponent, canActivate: [AuthguardGuard]},
  {path: 'start', component: StartComponent, canActivate: [AuthguardGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'prefix'},
  {path: '**', component: LandingComponent, canActivate: [AuthguardGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

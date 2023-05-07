import {Injectable} from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {Router} from "@angular/router";

import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {GoogleAuthProvider} from "firebase/auth";
import {User} from "../interfaces/user";
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$: Observable<any>;
  user!: User
  loggedIn = false;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    GoogleAuth.initialize()
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    // const credential = await this.afAuth.signInWithPopup(provider);
     let user = await GoogleAuth.signIn();

    console.log(user)
    this.user = this.makeUserObj(user)


    return this.updateUserData(this.user);
  }

  async signOut() {
    await GoogleAuth.signOut()
    return this.router.navigate(['/']);
  }

  private updateUserData(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    localStorage.setItem('loggedIn', 'true')
    this.router.navigate(['/overview'])

    user = this.makeUserObj(user)

    return userRef.set(user, {merge: true});
  }

  private makeUserObj(user: any) {
    const userObj: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      birthday: null
    };

    localStorage.setItem('user', JSON.stringify(userObj))

    return userObj
  }
}

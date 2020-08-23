import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        public ngZone: NgZone) {
          this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                // Logged in
              if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
              } else {
                // Logged out
                return of(null);
              }
            })
          );
         }

        //  signIn(email, password) {
        //   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        //     .then((result) => {
        //       // this.ngZone.run(() => {
        //         this.router.navigate(['dashboard']);
        //      // });
        //         this.setUserData(result.user);
        //     }).catch((error) => {
        //       console.log(error.message);
        //     });
        // }
        signIn(email: string, password: string) {
          this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(res => {
              this.router.navigate(['qa-reports']);
              this.setUserData(res.user);
              console.log('You are Successfully logged in!');
            })
          .catch(err => {
            console.log('Something is wrong:', err.message);
          });
        }

        signUp(email, password) {
          return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
              this.sendVerificationMail();
              this.setUserData(result.user);
            }).catch((error) => {
              console.log(error.message);
            });
        }

        sendVerificationMail() {
          return this.afAuth.auth.currentUser.sendEmailVerification()
          .then(() => {
            this.router.navigate(['verify-email-address']);
          });
        }

        forgotPassword(passwordResetEmail) {
          return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
          .then(() => {
            window.alert('נשלח דןא"ל לאיפוס סיסמה, בדוק את ההודעות שלך');
          }).catch((error) => {
            window.alert(error);
          });
        }

        // get isLoggedIn(): boolean {
        //   const user = JSON.parse(localStorage.getItem('user'));
        //   return (user !== null && user.emailVerified !== false) ? true : false;
        // }

        //  async googleSignin() {
        //   const provider = new auth.GoogleAuthProvider();
        //   const credential = await this.afAuth.auth.signInWithPopup(provider);
        //   return this.setUserData(credential.user);
        // }

        private setUserData(user) {
          const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: user.role
          };

          return userRef.set(userData, { merge: true });
        }

        async signOut() {
          await this.afAuth.auth.signOut();
          this.router.navigate(['login']);
        }

}

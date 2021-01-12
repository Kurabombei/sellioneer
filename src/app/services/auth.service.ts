import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {auth} from 'firebase';
import {User} from '../models/user.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: firebase.User;
  constructor(public  afAuth: AngularFireAuth, private afs: AngularFirestore, public  router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('userID', JSON.stringify(this.user.uid));
          return this.afs.doc<User>('users/${user.uid}').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut(){
     await this.afAuth.signOut();
     localStorage.removeItem('user');
     localStorage.removeItem('userID');
     return this.router.navigate(['login']);
  }
// uid, name, surname, email, password, age, rating, isProvider, isBanned, avatar
  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}');
    const data = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      avatar: user.photoURL,
      roles: {
        user: true, provider: false, admin: false
      }
      // surname: user.surname,
      // password: user.password,
      // name,
      // nameToSearch: name.toLowerCase(),
      // surname,
      // password,
      // age,
      // rating,
      // isProvider,
      // isBanned,
      // avatar,
    };
    return userRef.set(data, {merge: true});
  }

  async login(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    console.log('logged in', email);
    return this.router.navigate(['user-cabinet']);
  }
  async register(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password).then(cred => {
      return this.afs.collection('users').doc(cred.user.uid).set({
        name: cred.user.displayName
      });
    });
    alert('You need to verify your email!');
    this.router.navigate(['home']);
    return this.sendEmailVerification();
  }
  // tslint:disable-next-line:typedef
  sendEmailVerification() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    return this.router.navigate(['home']);
  }
// abilities of users
  canRead(user: User): boolean {
    const allowed = ['user', 'provider', 'admin'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['provider', 'admin'];
    return this.checkAuthorization(user, allowed);
  }
  canCreate(user: User): boolean {
    const allowed = ['provider', 'admin'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['provider', 'admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if (user.roles[role]){
        return true;
      }
    }
    return false;
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
  test(): void{
    const docRef = this.afs.collection('users');


  }
}

import {Component, HostListener, ViewChild} from '@angular/core';
import { AngularFirestore  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sellioneer';
  users: Observable<any[]>;
  opened = true;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  ngOnInit() {
    // user: this.afAuth.currentUser;
    // item: this.afAuth.currentUser;


    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public auth: AuthService){
    this.users = firestore.collection('users').valueChanges();
  }
}

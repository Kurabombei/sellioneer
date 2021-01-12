import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user.model';
// import {User} from 'firebase';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit {
  public user$: Observable<User>;
  public currentUserID: string;

  constructor(public auth: AuthService, public  afAuth: AngularFireAuth, private afs: AngularFirestore, private userService: UsersService, public router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          return this.afs.collection('users').doc( 'A8ltbibFLCT82UhnE7lCxQJJUAf2' ).valueChanges(); // 'A8ltbibFLCT82UhnE7lCxQJJUAf2'
        } else {
          console.log('user null !!');
          return of(null);
        }
      })
    );
  }
  ngOnInit() {
    this.getData();
  }

  getData(){
    // this.userService.getUser(this.user$.)
    //   .subscribe(result => {
    //     this.items = result;
    //     this.age_filtered_items = result;
    //     this.name_filtered_items = result;
    //   });
    // this.user$ = JSON.parse(localStorage.getItem('user'));
    this.currentUserID = localStorage.getItem('userID');

  }
  viewDetails(id){
    this.router.navigate(['details/' + id]);
  }
  alertWork(){
    alert('Вибачте, але ця функція ще у розробці. Приємного користування!');
  }
}

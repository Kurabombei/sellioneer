import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UsersService} from './users.service';
import {GoodsService} from './goods.service';


@Injectable({
  providedIn: 'root'
})
export class DataExportService {

  constructor(public db: AngularFirestore, public userService: UsersService, public goodService: GoodsService) { }
  items: Array<any>;
  users: Array<any>;
  providers: Array<any>;
  admins: Array<any>;
  // tslint:disable-next-line:typedef
  exportPDF(){
    this.db.collection('users', ref => ref.where('role', '==', '100')).snapshotChanges().subscribe(result => { this.users = result; });
    this.db.collection('users', ref => ref.where('role', '==', '110')).snapshotChanges().subscribe(result => { this.providers = result; });
    this.db.collection('users', ref => ref.where('role', '==', '111')).snapshotChanges().subscribe(result => { this.admins = result; });

    console.log(this.users);
    console.log(this.providers);
    console.log(this.admins);
    console.log('second take roles!');
    // this.db.collection('users', ref => ref.where('roles.user', '==', true)).snapshotChanges().subscribe(result => { this.users = result; });
    // this.db.collection('users', ref => ref.where('roles.provider', '==', true)).snapshotChanges().subscribe(result => { this.providers = result; });
    // this.db.collection('users', ref => ref.where('roles.admin', '==', true)).snapshotChanges().subscribe(result => { this.admins = result; });
    console.log(this.users);
    console.log(this.providers);
    console.log(this.admins);
  }
}

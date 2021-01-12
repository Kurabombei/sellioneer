import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AvatarDialogComponent} from '../avatar-dialog/avatar-dialog.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-edit-good',
  templateUrl: './edit-good.component.html',
  styleUrls: ['./edit-good.component.css']
})
export class EditGoodComponent implements OnInit {
  exampleForm: FormGroup;
  item: any;

  // tslint:disable-next-line:variable-name
  validation_messages = {
    name: [
      { type: 'required', message: 'Потрібна назва.' }
    ],
    location_id: [
      { type: 'required', message: 'Потрібна точка на карті.' }
    ],
    price: [
      { type: 'required', message: 'Потрібна ціна.' }
    ],
    comment: [
      { type: 'required', message: 'Потрібен детальний опис.' }
    ]
  };

  constructor(
    public firebaseService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public afAuth: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      console.log('routedata retrieved');
      console.log(data);
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      comment: [this.item.comment, Validators.required],
      price: [this.item.price, Validators.required],
      quantity: [this.item.quantity]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.item.avatar = result.AvatarLink;
      }
    });
  }

  onSubmit(value){
    value.avatar = this.item.avatar;
    value.price = Number(value.price);
    value.quantity = Number(value.quantity);
    this.firebaseService.updateUser(this.item.id, value)
      .then(
        res => {
          if (this.afAuth.isLoggedIn){
            this.router.navigate(['/goods']);
          } else {
            this.router.navigate(['/admin-goods']);
          }
        }
      );
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
      .then(
        res => {
          if (this.afAuth.isLoggedIn){
            this.router.navigate(['/goods']);
          } else {
            this.router.navigate(['/admin-goods']);
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  cancel(){
    if (this.afAuth.isLoggedIn){
      this.router.navigate(['/goods']);
    } else {
      this.router.navigate(['/admin-goods']);
    }
  }
}

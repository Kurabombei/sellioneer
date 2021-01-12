import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

  validation_messages = {
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    surname: [
      { type: 'required', message: 'Surname is required.' }
    ],
    age: [
      { type: 'required', message: 'Age is required.' },
    ]
  };
  hide: boolean;

  constructor(
    public firebaseService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.hide = false;
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      uid: [this.item.uid],
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      phone: [this.item.phone, Validators.required],
      email: [this.item.email, Validators.required],
      password: [this.item.password, Validators.required],
      age: [this.item.age, Validators.required]
    });
  }

  passwordInput() { return this.exampleForm.get('password').value; }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.item.avatar = result.avatarLink;
      }
    });
  }

  onSubmit(value){
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['home']);
        }
      );
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
      .then(
        res => {
          this.router.navigate(['home']);
        },
        err => {
          console.log(err);
        }
      );
  }
  cancel(){
    this.router.navigate(['home']);
  }
}

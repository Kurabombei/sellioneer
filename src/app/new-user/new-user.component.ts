import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {AvatarDialogComponent} from '../avatar-dialog/avatar-dialog.component';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userCreateForm: FormGroup;
  avatarLink = 'https://img.icons8.com/ios/452/anonymous-mask.png';
    // tslint:disable-next-line:variable-name
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
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: UsersService,
    public afAuth: AuthService
  ) { }
  ngOnInit(): void{
    this.createForm();
  }

  createForm() {
    this.userCreateForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required ]
    });

    this.hide = true;
  }
  passwordInput() { return this.userCreateForm.get('password').value; }
  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.avatarLink = result.avatarLink;
      }
    });
  }

  resetFields(){
    this.avatarLink = 'https://www.shareicon.net/data/256x256/2016/08/18/813671_dog_512x512.png';
    this.userCreateForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required)
    });
  }

  onSubmit(value){
    this.firebaseService.createUser(value, this.avatarLink)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['home']);
        }
      );
    this.afAuth.login(value.email, value.password);
    this.afAuth.sendEmailVerification();
  }
}

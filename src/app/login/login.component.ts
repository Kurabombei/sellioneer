import { Component, OnInit } from '@angular/core';
import {auth} from 'firebase';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  constructor(
      private fb: FormBuilder,
      private router: Router,
      public firebaseService: UsersService,
      public afAuth: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.userLoginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(value){
    this.firebaseService.getUser(value.email);
    this.afAuth.login(value.email, value.password);
    this.afAuth.sendEmailVerification();
  }
  passwordReset(value){
    const emailToResetPassword = value.email;
    this.afAuth.sendPasswordResetEmail(emailToResetPassword);
  }
}

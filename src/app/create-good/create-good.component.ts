import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { GoodsService } from '../services/goods.service';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {AvatarDialogComponent} from '../avatar-dialog/avatar-dialog.component';

@Component({
  selector: 'app-create-good',
  templateUrl: './create-good.component.html',
  styleUrls: ['./create-good.component.css']
})
export class CreateGoodComponent implements OnInit {
  userCreateForm: FormGroup;
  avatarLink = 'https://img.icons8.com/ios/452/anonymous-mask.png';
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
  hide: boolean;
  providerID: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public userService: UsersService,
    public goodService: GoodsService,
    public afAuth: AuthService
  ) { }
  ngOnInit(): void{
    this.createForm();
  }

  createForm() {
    this.userCreateForm = this.fb.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['']
    });

    this.hide = false;
  }
  passwordInput() { return this.userCreateForm.get('password').value; }
  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.avatarLink = result.link;
      }
    });
  }

  resetFields(){
    this.avatarLink = 'https://www.shareicon.net/data/256x256/2016/08/18/813671_dog_512x512.png';
    this.userCreateForm = this.fb.group({
      name: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('')
    });
  }

  onSubmit(value){
    this.providerID = localStorage.getItem('userID');
    this.goodService.createGood(value, this.avatarLink, this.providerID)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['admin-goods']);
        }
      );
    console.log(this.afAuth.user$);
    alert(this.providerID);

  }
}

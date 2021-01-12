import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import vision from '@google-cloud/vision';

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.css']
})
export class AvatarDialogComponent implements OnInit {


  avatars: Array<any> = new Array<any>();
  avatarForm: FormGroup;
  file: any;

// Creates a client
  //private client = new vision.ImageAnnotatorClient();
  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    private fb: FormBuilder,
    public firebaseService: UsersService
  ) { }
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getAvatars()
      .subscribe(data => this.avatars = data);
  }

  close(avatar){
    this.dialogRef.close(avatar);
  }
  addAvatar(avatar){
    this.file.avatarLink = avatar;
    this.avatarForm = this.fb.group({
      file: [this.file.avatarLink]
    });
    const avatarLink = avatar;
    alert(avatar);
    if (avatar){
      this.firebaseService.getAvatars().subscribe(data => this.avatars.push(avatarLink));
    }
    this.firebaseService.getAvatars().subscribe(data => this.avatars.push());
  }
}

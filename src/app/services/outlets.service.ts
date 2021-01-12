import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OutletsService {

  constructor() { }
  form = new FormGroup({
    providerUID: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    comment: new FormControl(''),
    photoURL: new FormControl(''),
    active: new FormControl(true)
  });
}

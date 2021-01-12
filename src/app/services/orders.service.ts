import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }
  form = new FormGroup({
    customerUID: new FormControl(''),
    customerName: new FormControl(''),
    providerUID: new FormControl(''),
    orderNumber: new FormControl(''),
    userFeedback: new FormControl(''),
    completed: new FormControl(false)
  });
}

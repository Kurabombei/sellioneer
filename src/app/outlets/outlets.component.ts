import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { OutletsService } from '../services/outlets.service';

@Component({
  selector: 'app-outlets',
  templateUrl: './outlets.component.html',
  styleUrls: ['./outlets.component.css']
})
export class OutletsComponent implements OnInit {

  constructor(private ordersService: OrdersService, private outletsService: OutletsService) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {GoodsService} from '../../services/goods.service';
import { PDFDocument, rgb } from 'pdf-lib';
@Component({
  selector: 'app-admin-goods',
  templateUrl: './admin-goods.component.html',
  styleUrls: ['./admin-goods.component.css']
})
export class AdminGoodsComponent implements OnInit {

  priceValue = 0;
  searchValue = '';
  items: Array<any>;

// tslint:disable-next-line:variable-name
  name_filtered_items: Array<any>;
// tslint:disable-next-line:variable-name
  price_filtered_items: Array<any>;
  constructor(
    // private pdfDoc: PDFDocument,
    public firebaseService: GoodsService,
    private router: Router
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getData();
  }

  // tslint:disable-next-line:typedef
  getData(){
    this.firebaseService.getGoods()
      .subscribe(result => {
        this.items = result;
        // # todo add here like sorted and all
        this.price_filtered_items = result;
        this.name_filtered_items = result;
      });
  }
  // tslint:disable-next-line:typedef
  viewDetails(item){
    this.router.navigate(['goods/' + item.payload.doc.id]);
  }

  // tslint:disable-next-line:typedef
  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // tslint:disable-next-line:typedef
  searchByName(){
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchGoods(value)
      .subscribe(result => {
        this.name_filtered_items = result;
        this.items = this.combineLists(result, this.price_filtered_items);
      });
  }

  // tslint:disable-next-line:typedef
  rangeChange(event){
    this.firebaseService.searchGoodsByPrice(event.value)
      .subscribe(result => {
        this.price_filtered_items = result;
        this.items = this.combineLists(result, this.name_filtered_items);
      });
  }

  // tslint:disable-next-line:typedef
  combineLists(a, b){
    const result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}

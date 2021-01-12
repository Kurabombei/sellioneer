import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router, Params } from '@angular/router';
// import { google } from '@types/googlemaps';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  ageValue = 0;
  searchValue = '';
  items: Array<any>;
  // tslint:disable-next-line:variable-name
  age_filtered_items: Array<any>;
  // tslint:disable-next-line:variable-name
  name_filtered_items: Array<any>;

  constructor(
    public firebaseService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getUsers()
      .subscribe(result => {
        this.items = result;
        this.age_filtered_items = result;
        this.name_filtered_items = result;
      });
  }

  viewDetails(item){
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
      .subscribe(result => {
        this.name_filtered_items = result;
        this.items = this.combineLists(result, this.age_filtered_items);
      });
  }

  rangeChange(event){
    this.firebaseService.searchUsersByAge(event.value)
      .subscribe(result => {
        this.age_filtered_items = result;
        this.items = this.combineLists(result, this.name_filtered_items);
      });
  }

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

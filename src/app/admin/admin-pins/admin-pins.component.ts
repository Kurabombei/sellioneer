import { Component, OnInit } from '@angular/core';
import {DataExportService} from '../../services/dataexport.service';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-pins',
  templateUrl: './admin-pins.component.html',
  styleUrls: ['./admin-pins.component.css']
})
export class AdminPinsComponent implements OnInit {
  items: Array<any>;
  constructor(
    public dataService: DataExportService,
    public firebaseService: UsersService,
    private router: Router,
    public afAuth: AuthService ) { }

  ngOnInit() {
    this.getData();
    // this.dataService.exportPDF();
  }
  getData(){
    this.firebaseService.getUsers()
      .subscribe(result => {
        this.items = result;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService} from '../services/auth.service';
import {auth} from 'firebase';
import {UsersService} from '../services/users.service';
import {DataExportService} from '../services/dataexport.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public afAuth: AuthService, public userService: UsersService, public dataService: DataExportService) { }

  public onToggleSidenav = () => {
  }
  ngOnInit(): void {
  }

}

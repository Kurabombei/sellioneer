import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
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

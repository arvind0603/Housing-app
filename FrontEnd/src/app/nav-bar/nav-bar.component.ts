import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private alertify: AlertifyService) { }

  loggedinUser: string | undefined;

  ngOnInit() {
  }

  loggedin() {
    const loggedin = localStorage.getItem('userName');
    if (loggedin) {
      this.loggedinUser = loggedin;
      return this.loggedinUser
    }
    return null;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.alertify.success('You have been logged out');
  }

}

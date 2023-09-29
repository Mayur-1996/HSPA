import { Component, OnInit } from '@angular/core';
import { AlertyfyService } from '../services/alertyfy.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinuser:string;
  constructor(private alertyfy:AlertyfyService) { }

  ngOnInit() {
  }
  
  loggedin(){
   this.loggedinuser = localStorage.getItem('token');
   return this.loggedinuser;
  }

  onLogout(){

    localStorage.removeItem('token');
    this.alertyfy.success("You are logged out !")
  }
}

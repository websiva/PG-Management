import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  constructor(private router:Router){}

  logout(){
    localStorage.removeItem("userLevel");
    localStorage.removeItem("phoneNumber");
    localStorage.setItem("isLoggedIn","false");

    this.router.navigate(['/login']);
  }
}

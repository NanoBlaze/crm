import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  
searchText: any;
customers: Customer[] = [];
  constructor(private as: AuthService,private cs: CustomersService, private router: Router) {}

  ngOnInit(): void { 
    this.cs.getCustomers().subscribe((customersData: Customer[]) => {
      this.customers = customersData;
    });}

  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed'
    } else {
      styleClass = 'head-md-screen'
    }
    return styleClass
  }

  onLogout() {
    this.as.logout();
  }
  logout() {
    this.as
      .logout()
      .then(() => {
        this.as.setSessionData('isLoggedIn', 'false');
        this.router.navigateByUrl('login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkLogin() {
    return this.as.getSessionData('isLoggedIn') == 'true';
  }

  getUsername(): string {
    return this.as.getSessionData('username');
  }
}

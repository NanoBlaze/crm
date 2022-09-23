
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  template: `
    <body>
    </body>
  `,
  styles: ['body { background-color: green; }'],
  styleUrls: ['./register.component.css', ]
})
export class RegisterComponent implements OnInit {
  user: User = {email:"", password:""}
public showPassword: boolean = false;
  constructor(private as: AuthService, private router: Router ) {
  
   }

  ngOnInit(): void {
  }

 submitRegister() {
    this.as.register(this.user).then((data) => {
      console.log(data.user.email);
      this.as.setSessionData('username', data.user.email as string);
      this.as.setSessionData('isLoggedIn', 'true');
      this.router.navigateByUrl('home');
    }).catch((err) => {
      this.user = { email: '', password: '' };
    });
  }
public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}

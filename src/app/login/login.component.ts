import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user: User = new User('', '');
  errormsg: String = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService) {
    this.authenticationService.getUserInfo()
      .subscribe(
      data => {
        this.router.navigate(['dashboard']);
      });
  }

  ngOnInit() { }

  onSubmit() {
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(
      data => {
        this.cookieService.set('JWT', data.token);
        this.router.navigate(['dashboard']);
      },
      error => {
        console.error(error);
        this.errormsg =  error.error.error;
      });
  }
}

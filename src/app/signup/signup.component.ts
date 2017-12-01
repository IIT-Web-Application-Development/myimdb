import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  user: User = new User('', '', '');
  created = false;
  errormsg: String = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.errormsg = '';
    this.authenticationService.signup(this.user.username, this.user.password, this.user.full_name)
      .subscribe(
      data => {
        this.created = true;
        this.cookieService.set('JWT', ''); // Logout
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);
      },
      error => {
        console.log(error);
        this.errormsg =  error.error.error;
      });
  }

}

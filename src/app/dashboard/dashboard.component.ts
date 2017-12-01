import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  private user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.getUserInfo()
      .subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      error => {
        console.error(error);
        this.router.navigate(['login']);
      });
  }

  ngOnInit() {
  }

}

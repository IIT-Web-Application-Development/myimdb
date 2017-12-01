import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Movie, Series } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  private user: any;
  private movies: Movie[] = [
    {
      title: 'Terminator',
      description: 'Lorem ipsum'
    },
    {
      title: 'Terminator 2',
      description: 'Lorem ipsum'
    }
  ];
  private series: Series[];

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
        this.router.navigate(['login']);
      });
  }

  ngOnInit() {
  }

  logout() {
    this.cookieService.set('JWT', '');
    this.router.navigate(['/']);
  }
}

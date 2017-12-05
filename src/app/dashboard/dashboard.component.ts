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
  private movies: Movie[];
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
    this.authenticationService.getFavoriteMovies()
      .subscribe(
      (movies) => {
        setTimeout(() => this.movies = movies, 0);

        console.log(movies);
      },
      error => {
        console.error(error);
      });

    this.authenticationService.getFavoriteSeries()
      .subscribe(
      series => {
        console.log(series);
        if (series) {
          this.movies = series;
        }
      },
      error => {
        console.error(error);
      });
  }

  ngOnInit() {
  }

  logout() {
    this.cookieService.set('JWT', '');
    this.router.navigate(['/']);
  }

  removeFavMovie(movie: Movie) {
    console.log(movie);
    const index = this.movies.findIndex((el: Movie) => {
      return el._id === movie._id;
    });
    console.log(index);
    this.authenticationService.removeFavoriteMovie(movie._id)
      .subscribe(
      nothing => {
        if (this.movies.length > 1) {
          console.log(this.movies);
          console.log(index);
          setTimeout(() => this.movies.splice(index, 1), 0);
        } else {
          this.movies = [];
        }
      },
      error => {
        console.error(error);
      });
  }
}

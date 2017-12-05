import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: String, password: String) {
    return this.http.post('/api/authenticate',
      JSON.stringify({ username: username, password: password }),
      {
        headers: new HttpHeaders().set('Content-Type', `application/json`)
      })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(response);
        const user: any = response;
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  signup(username: String, password: String, full_name: String) {
    return this.http.post('/api/register',
      JSON.stringify({ username: username, password: password, full_name: full_name }),
      {
        headers: new HttpHeaders().set('Content-Type', `application/json`)
      })
      .map((response: Response) => {
        const res: any = response;
        return res.id;
      });
  }

  getUserInfo() {
    return this.http.get('/api/user',
      {
        headers: new HttpHeaders().set('Content-Type', `application/json`)
      })
      .map((response: Response) => {
        const user: any = response;
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getFavoriteMovies() {
    return this.http.get('/api/favorite/movies',
      {
        headers: new HttpHeaders().set('Content-Type', `application/json`)
      })
      .map((response: Response) => {
        const movies: any = response;
        return movies;
      });
  }

  getFavoriteSeries() {
    return this.http.get('/api/favorite/series',
      {
        headers: new HttpHeaders().set('Content-Type', `application/json`)
      })
      .map((response: Response) => {
        const series: any = response;
        return series;
      });
  }

  removeFavoriteMovie(id: string) {
    return this.http.delete('/api/favorite/movies/' + id,
      {
        headers: new HttpHeaders().set('Content-Type', `application/json`)
      })
      .map((response: Response) => {
        return response;
      });
  }

}

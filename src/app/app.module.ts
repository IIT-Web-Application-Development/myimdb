import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandpageComponent } from './landpage/landpage.component';
import { SeriesComponent } from './series/series.component';
import { MoviesComponent } from './movies/movies.component';

// Services
import { AuthenticationService } from './authentication.service';

// Define app routes
const ROUTES = [
  {
    path: '',
    component: LandpageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'series',
    component: SeriesComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandpageComponent,
    SeriesComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

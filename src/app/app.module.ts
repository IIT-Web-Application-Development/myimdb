import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandpageComponent } from './landpage/landpage.component';
import { SeriesComponent } from './series/series.component';
import { MoviesComponent } from './movies/movies.component';

// Define app routes
const ROUTES = [
  {
    path: '',
    component: LandpageComponent,
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: LoginComponent
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
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

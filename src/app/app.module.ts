import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandpageComponent } from './landpage/landpage.component';
import { CookieService } from 'ngx-cookie-service';

// Services
import { AuthenticationService } from './authentication.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

// Define app routes
const ROUTES = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    component: LandpageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandpageComponent,
    DashboardComponent,
    SignupComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [AuthenticationService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

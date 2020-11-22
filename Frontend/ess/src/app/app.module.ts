import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './templates/head/head.component';
import { LoginComponent } from './auth/login.component';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { AuthenticationService } from './serivces/authentication.service';
import { SignupComponent } from './auth/signup.component';
// import { UsernameValidatorDirective } from './directives/username-validator.directive';
// import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    LoginComponent,
    LandingComponent,
    SignupComponent,
    // UsernameValidatorDirective,
    // PasswordValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

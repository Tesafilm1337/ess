import { style, trigger, transition, animate, keyframes } from '@angular/animations';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../serivces/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('changePage', [
      transition('page1 => page2', animate('250ms ease-in-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(-540px)', offset: 1})
      ]))),
      transition('page2 => page1', animate('250ms ease-in-out', keyframes([
        style({transform: 'translateX(-540px)', offset: 0}),
        style({transform: 'translateX(0)', offset: 1})
      ]))),
    ])
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  loading = false;

  page = 'page1';
  page1Active = true;
  page2Active = false;

  model = {
    username: null,
    password: null,
  };

  @ViewChild('username', { read: ElementRef, static: false }) username: ElementRef<HTMLInputElement>;
  @ViewChild('password', { read: ElementRef, static: false }) password: ElementRef<HTMLInputElement>;

  constructor(
    public location: Location,
    private zone: NgZone,
    private authentication: AuthenticationService
  ) { }

  ngOnInit() {
    this.location.replaceState('/login', '', {page: 1});
  }

  ngAfterViewInit() {
    this.username.nativeElement.focus();
  }

  @HostListener('window:popstate')
  windowPopstate() {
    this.page = `page${window.history.state.page}`;
  }

  async checkUsername(form: NgForm) {
    if (form.invalid) {
      this.username.nativeElement.focus();
      return;
    }

    (document.activeElement as HTMLElement).blur();
    this.loading = true;
    const data = await this.authentication.checkUsername(this.model.username).toPromise();
    if (data.data) {
      this.zone.run(window.history.pushState, window.history, [{page: 2}, '']);
      this.page = 'page2';
    } else {
      this.loading = false;
      form.controls.username.setErrors({ notFound: true });
      this.username.nativeElement.focus();
    }
  }

  animationStart(event) {
    if (event.fromState === 'page1' && event.toState === 'page2') {
      this.page2Active = true;
    } else if (event.fromState === 'page2' && event.toState === 'page1') {
      this.page1Active = true;
    }
  }

  animationDone(event) {
    if (event.fromState === 'page1' && event.toState === 'page2') {
      this.page1Active = false;
      this.password.nativeElement.focus();
    } else if (event.fromState === 'page2' && event.toState === 'page1') {
      this.page2Active = false;
      this.username.nativeElement.focus();
    }
    this.loading = false;
  }

}

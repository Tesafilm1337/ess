import { style, state, trigger, transition, animate, keyframes } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('changePage', [
      transition('page1 => page2', animate('250ms ease-in-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(-540px)', offset: 1})
      ]))),
      transition('page2 => page1', animate('250ms ease-in-out', keyframes([
        style({transform: 'translateX(-540px)', offset: 0}),
        style({transform: 'translateX(0)', offset: 1})
      ])))
    ])
  ]
})
export class LoginComponent implements OnInit {
  page = 'page1';
  page1Active = true;
  page2Active = false;

  model = {
    username: null,
    password: null,
  };

  private submittedName: string;

  constructor(
    public location: Location,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.location.replaceState('/login', '', {page: 1});
  }

  @HostListener('window:popstate')
  windowPopstate() {
    this.page = `page${window.history.state.page}`;
  }

  checkUsername(form: NgForm) {
    if (form.controls.username.value === this.submittedName) {
      this.location.forward();
    } else {
      this.submittedName = this.model.username;
      this.zone.run(window.history.pushState, window.history, [{page: 2}, '']);
      this.page = 'page2';
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
    } else if (event.fromState === 'page2' && event.toState === 'page1') {
      this.page2Active = false;
    }
  }

}

import { style, trigger, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./auth.component.scss', './signup.component.scss'],
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
export class SignupComponent implements OnInit {

  page = 'page1';
  page1Active = true;
  page2Active = false;

  model = {
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    password1: null,

    email: null,
    day: null,
    month: null,
    year: null,
  };

  monthFocused = false;

  constructor() { }

  ngOnInit(): void {
  }

  submitForm1(form: NgForm) {
    this.page = 'page2';
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

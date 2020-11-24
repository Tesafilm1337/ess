import { style, trigger, transition, animate, keyframes } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { AuthenticationService } from '../serivces/authentication.service';

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
export class SignupComponent implements OnInit, AfterViewInit {
  loading = false;

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

  @ViewChild('firstName', { read: ElementRef, static: false }) firstName: ElementRef<HTMLInputElement>;
  @ViewChild('lastName', { read: ElementRef, static: false }) lastName: ElementRef<HTMLInputElement>;
  @ViewChild('username', { read: ElementRef, static: false }) username: ElementRef<HTMLInputElement>;
  @ViewChild('password', { read: ElementRef, static: false }) password: ElementRef<HTMLInputElement>;
  @ViewChild('password1', { read: ElementRef, static: false }) password1: ElementRef<HTMLInputElement>;

  constructor(
    private auth: AuthenticationService
  ) { }

  get form1(): { [key: string]: ElementRef<HTMLInputElement> } {
    return {
      'first-name': this.firstName,
      'last-name': this.lastName,
      username: this.username,
      password: this.password,
      password1: this.password1
    };
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.firstName.nativeElement.focus();
  }

  async submitForm1(form: NgForm) {
    if (form.invalid) {
      const invalids = Object.keys(this.form1).filter(key => form.controls[key].invalid).map(key => this.form1[key]);
      invalids[0].nativeElement.focus();
      return;
    }

    (document.activeElement as HTMLElement).blur();
    this.loading = true;
    const data = await this.auth.checkUsername(form.controls.username.value).toPromise();
    if (!data.data) {
      this.page = 'page2';
    } else {
      this.loading = false;
      form.controls.username.setErrors({ username: true });
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
    } else if (event.fromState === 'page2' && event.toState === 'page1') {
      this.page2Active = false;
    }
    this.loading = false;
  }
}

import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { AuthData } from '../interfaces/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users = [
    {
      username: 'Simone Zitrone',
      password: 'password'
    }
  ];

  constructor() { }

  checkUsername(username: string): Observable<AuthData<boolean>> {
    if (username === 'Simone Zitrone') {
      var data: AuthData<boolean> = {
        data: true
      };
    } else {
      var data: AuthData<boolean> = {
        data: false,
        errors: [
          'user-not-found'
        ]
      };
    }

    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(data);
        subscriber.complete();
      }, 3250);
    });
  }

  login(username: string, password: string): Observable<AuthData<boolean>> {
    const result = this.users.filter(user => user.username === username);
    let data: AuthData<boolean> = null;
    if (result.length !== 1) {
      data = {
        data: false,
        errors: [ 'unknown' ]
      };
    } else if (result[0].password !== password) {
      data = {
        data: false,
        errors: [ 'password' ]
      };
    } else {
      data = { data: true };
    }

    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(data);
        subscriber.complete();
      }, 3250);
    });
  }
}

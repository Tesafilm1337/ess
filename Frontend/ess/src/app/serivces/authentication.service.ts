import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from '../interfaces/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  checkUsername(username: string): Observable<AuthData<boolean>> {
    const data: AuthData<boolean> = {
      data: false,
      errors: [
        'user-not-found'
      ]
    };

    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(data);
        subscriber.complete();
      }, 3250);
    });
  }
}

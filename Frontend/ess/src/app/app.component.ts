import { Component, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ess';
  headActive = true;

  @HostBinding('attr.head') get head() { return this.headActive ? '' : null; }

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/login') || event.url.startsWith('/')) {
        this.headActive = false;
        } else {
          this.headActive = true;
        }
      }
    });
  }
}

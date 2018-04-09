import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, LoadingStatus } from '@app/core/store/app.state';
import { isAuthenticated, getLoadingStatus } from '@app/core/store/auth/auth.reducer';
import * as AuthActions from '@app/core/store/auth/auth.actions';

@Component({
  selector: 'ezi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loadingStatus$: Observable<LoadingStatus>;
  isAuthenticated$: Observable<boolean>;

  constructor(public store: Store<AppState>, private router: Router) {
    this.loadingStatus$ = this.store.select(getLoadingStatus);
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  ngOnInit() {
    this.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) this.router.navigate(['/'])
    });
  }

  login() {
    this.store.dispatch(new AuthActions.Authentication());
  }
}

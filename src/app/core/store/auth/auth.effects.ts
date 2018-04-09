import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { withLatestFrom, map, switchMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '@app/core/services/auth.service';
import { AppState } from '../app.state';
import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {

    // MARK: - Constructor

    constructor(
        public authService: AuthService,
        public store: Store<AppState>,
        private actions$: Actions,
        private snackBar: MatSnackBar
    ) { }

    @Effect() loadIssues$ = this.actions$.ofType(AuthActions.AUTHENTICATION)
        .pipe(
            switchMap((action: AuthActions.Authentication) => this.authService.login()),
            map((response: boolean) => new AuthActions.AuthenticationSuccess({isAuthenticated: response})),
            catchError((error, caught) => {
                this.snackBar.open('Sorry! Facing issues with Authentication', 'Ok', {
                    duration: 5000,
                });
                return Observable.of(new AuthActions.AuthenticationFailure())
            })
        );
}

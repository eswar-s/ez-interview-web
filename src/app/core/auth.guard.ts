import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';

import { AuthState, AppState } from './store/app.state';
import { isAuthenticated } from './store/auth/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    // MARK: - Constructor

    constructor(
        public store: Store<AppState>,
        public router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        // get observable
        const observable = this.store.select(isAuthenticated);
    
        // redirect to sign in page if user is not authenticated
        observable.subscribe(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/login']);
          }
        });
    
        return observable;
      }
    
      
      canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        // get observable
        const observable = this.store.select(isAuthenticated);
    
        // redirect to sign in page if user is not authenticated
        observable.subscribe(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/login']);
          }
        });
    
        return observable;
      }
}
import { Action } from '@ngrx/store';

export const AUTHENTICATION = '[auth] - [authentication]';
export const AUTHENTICATION_SUCCESS = '[auth] - [authentication] - [success]';
export const AUTHENTICATION_FAILURE = '[auth] - [authentication] - [failure]';

export class Authentication implements Action {
  readonly type = AUTHENTICATION;
}

export class AuthenticationSuccess implements Action {
    readonly type = AUTHENTICATION_SUCCESS;
    constructor(public payload: {isAuthenticated: boolean}) { }
}

export class AuthenticationFailure implements Action {
    readonly type = AUTHENTICATION_FAILURE;
}

export type All = Authentication | AuthenticationSuccess | AuthenticationFailure
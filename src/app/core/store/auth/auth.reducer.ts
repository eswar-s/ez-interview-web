import { createSelector, Selector } from '@ngrx/store';

import { AppState, AuthState, LoadingStatus } from '../app.state';
import * as AuthActions from './auth.actions';

const initialState: AuthState = {
    authenticated: false,
    loadingStatus: LoadingStatus.INITIAL
};

export function authReducer(state = initialState, action: AuthActions.All): AuthState {
    switch (action.type) {
        case AuthActions.AUTHENTICATION: {
            return { 
                ...state, 
                loadingStatus: LoadingStatus.LOADING
            };
        }
        case AuthActions.AUTHENTICATION_SUCCESS: {
            return { 
                ...state, 
                loadingStatus: LoadingStatus.SUCCESS, 
                authenticated: action.payload.isAuthenticated
            };
        }
        case AuthActions.AUTHENTICATION_FAILURE: {
            return { ...state, loadingStatus: LoadingStatus.FAILURE };
        }
        default: {
            return state;
        }
    }
}

const getAuthState: Selector<AppState, AuthState> = (state: AppState) => state.authState;

export const isAuthenticated: Selector<AppState, boolean> = createSelector(
    getAuthState, (state: AuthState) => state.authenticated);

export const getLoadingStatus: Selector<AppState, LoadingStatus> = createSelector(
    getAuthState, (state: AuthState) => state.loadingStatus);
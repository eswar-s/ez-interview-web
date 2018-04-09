import { ActionReducerMap } from '@ngrx/store';

export enum LoadingStatus {
    INITIAL,
    LOADING,
    SUCCESS,
    FAILURE
}

export interface AppState {
    authState: AuthState;
}

export interface AuthState {
    authenticated: boolean,
    loadingStatus: LoadingStatus;
}
import { Action } from '@ngrx/store';
import { Loading } from './interfaces';

export const START_LOADING = '[App] START_LOADING';
export const FINISH_LOADING = '[App] FINISH_LOADING';
export const ADD_SERVER_ERROR = '[App] ADD_SERVER_ERROR';
export const REMOVE_SERVER_ERROR = '[App] REMOVE_SERVER_ERROR';
export const REMOVE_SERVER_ERRORS = '[App] REMOVE_SERVER_ERRORS';

export class StartLoadingAction implements Action {
    readonly type = START_LOADING;

    constructor(public payload: Loading) {}
}

export class FinishLoadingAction implements Action {
    readonly type = FINISH_LOADING;

    constructor(public payload: string) {}
}

export class RemoveServerErrorAction implements Action {
    readonly type = REMOVE_SERVER_ERROR;

    constructor(public payload: string) {}
}

export class RemoveServerErrorsAction implements Action {
    readonly type = REMOVE_SERVER_ERRORS;
}

export class AddServerErrorAction implements Action {
    readonly type = ADD_SERVER_ERROR;

    constructor(public payload: string) {}
}

export type Actions =
    | StartLoadingAction
    | FinishLoadingAction
    | RemoveServerErrorAction
    | RemoveServerErrorsAction
    | AddServerErrorAction;

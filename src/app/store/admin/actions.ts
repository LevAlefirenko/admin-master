import { Action } from '@ngrx/store';
import { Admin } from '../../models';

export const UPDATE_CURRENT_ADMIN = '[Admin] update current';

export class UpdateAdminAction implements Action {
    readonly type = UPDATE_CURRENT_ADMIN;

    constructor(public payload: Admin) {}
}

export type Actions = UpdateAdminAction;

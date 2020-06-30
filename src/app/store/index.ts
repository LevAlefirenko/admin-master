import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrlModel } from '../../models';
import adminReducer, { AdminState } from './admin';
import appReducer, { AppState } from './app';
import { ActionReducerMap } from '@ngrx/store';

export * from './meta';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface ApplicationState {
    router: RouterReducerState<RouterStateUrlModel>;
    admin: AdminState;
    app: AppState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
const applicationState: ActionReducerMap<ApplicationState> = {
    router: routerReducer,
    admin: adminReducer,
    app: appReducer,
};

export default applicationState;

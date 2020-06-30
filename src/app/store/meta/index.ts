import { storeFreeze } from 'ngrx-store-freeze';

import { loggerMetaReducer } from './logger.meta-reducer';
import { environment } from '../../../environments/environment';

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const appMetaReducers = !environment.production
    ? [storeFreeze, loggerMetaReducer]
    : [];

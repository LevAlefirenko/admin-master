import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrlModel } from '../../../models';

export const getRouterState = createFeatureSelector('router');

export const getRouter = createSelector(
    getRouterState,
    (state: RouterReducerState<RouterStateUrlModel>) => state.state
);

export const getRouterData = createSelector(
    getRouter,
    (state: RouterStateUrlModel) => state.data
);

export const getRouterQueryParams = createSelector(
    getRouter,
    (state: RouterStateUrlModel) => state.queryParams
);

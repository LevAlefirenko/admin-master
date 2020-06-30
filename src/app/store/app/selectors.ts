import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './interfaces';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectIsLoading = createSelector(
    selectAppState,
    (app: AppState) => !!app.loadings.filter(y => y.global).length
);

export const selectServerErrors = createSelector(
    selectAppState,
    (app: AppState) => app.serverErrors
);

export const selectHasServerErrors = createSelector(
    selectServerErrors,
    (errors: string[]) => errors.length > 0
);

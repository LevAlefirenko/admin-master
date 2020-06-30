import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './interfaces';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectCurrentAdmin = createSelector(
    selectAdminState,
    (state: AdminState) => state.data
);

import { distinctUntilChanged, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AppState from '../../store/app';
import {
    AddServerErrorAction,
    FinishLoadingAction,
    RemoveServerErrorAction,
    RemoveServerErrorsAction,
    StartLoadingAction,
} from '../../store/app';
import { CoreModule } from '../core.module';
import { getValue } from '../../utils';

@Injectable({ providedIn: CoreModule })
export class AppService {
    public loading$: Observable<boolean>;
    public hasServerErrors$: Observable<boolean>;

    constructor(private _store: Store<any>) {
        this.loading$ = this._store
            .select(AppState.selectIsLoading)
            .pipe(distinctUntilChanged());

        this.hasServerErrors$ = this._store
            .select(AppState.selectHasServerErrors)
            .pipe(distinctUntilChanged());
    }

    public startLoading(key: string, global: boolean = true) {
        this._store.dispatch(new StartLoadingAction({ code: key, global }));
    }

    public isLoading$(key: string): Observable<boolean> {
        return this._store.select(AppState.selectAppState).pipe(
            map((x: AppState.AppState) => {
                return !!x.loadings.find(x => x.code === key);
            }),
            distinctUntilChanged()
        );
    }

    public isLoading(key: string): boolean {
        return getValue(this.isLoading$(key));
    }

    public finishLoading(key: string) {
        this._store.dispatch(new FinishLoadingAction(key));
    }

    public addServerError(url: string) {
        this._store.dispatch(new AddServerErrorAction(url));
    }

    public cleanServerError(url: string) {
        this._store.dispatch(new RemoveServerErrorAction(url));
    }

    public cleanServerErrors() {
        this._store.dispatch(new RemoveServerErrorsAction());
    }
}

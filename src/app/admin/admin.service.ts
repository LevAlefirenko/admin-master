import { distinctUntilChanged, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../constants';

import { getValue } from '../utils';
import { Admin } from '../models/admins';
import { AppService } from '../core/app/app.service';
import { CURRENT_ADMIN_FETCHING } from './admin.constants';
import * as AdminStore from '../store/admin';
import { UpdateAdminAction } from '../store/admin';

@Injectable({ providedIn: 'root' })
export class AdminService {
    public admin$: Observable<Admin>;

    constructor(
        private _store: Store<any>,
        private _http: HttpClient,
        private _app: AppService
    ) {
        this.admin$ = this._store
            .select(AdminStore.selectCurrentAdmin)
            .pipe(distinctUntilChanged());
    }

    public updateCurrent(admin: Admin) {
        this._store.dispatch(new UpdateAdminAction(admin));
    }

    public fetchCurrent(): void {
        this._app.startLoading(CURRENT_ADMIN_FETCHING);

        this._http
            .get(API_URLS.ADMIN_CURRENT)
            .pipe(
                finalize(() => {
                    this._app.finishLoading(CURRENT_ADMIN_FETCHING);
                })
            )
            .subscribe(
                (data: Admin) => {
                    this.updateCurrent(data);
                },
                err => {
                    this.updateCurrent(null);
                }
            );
    }

    public getCurrent() {
        return this._getCurrent();
    }

    private _getCurrent(): Admin {
        return getValue(this.admin$);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../../../core/app/app.service';
import { Observable } from 'rxjs';
import { applyTemplate } from '../../../utils';
import { API_URLS } from '../../../constants';
import { finalize, map } from 'rxjs/operators';
import {
    ADMIN_CREATE,
    ADMIN_FETCHING,
    ADMIN_REMOVE_FETCHING,
    ADMIN_UPDATE,
} from './admins.constants';
import { AdminDTO, AdminUpdateRequest } from './admins.interfaces';
import { Admin } from '../../../models';

@Injectable()
export class AdminsService {
    constructor(private http: HttpClient, private _app: AppService) {}

    remove(id: string): Observable<Object> {
        this._app.startLoading(ADMIN_REMOVE_FETCHING);
        return this.http
            .delete(applyTemplate(API_URLS.REMOVE_ADMIN, { id }))
            .pipe(
                finalize(() => this._app.finishLoading(ADMIN_REMOVE_FETCHING))
            );
    }

    update(
        id: string | number,
        request: AdminUpdateRequest
    ): Observable<Admin> {
        this._app.startLoading(ADMIN_UPDATE);
        return this.http
            .put(applyTemplate(API_URLS.ADMIN, { id }), request)
            .pipe(
                map((x: AdminDTO) => x),
                finalize(() => this._app.finishLoading(ADMIN_UPDATE))
            );
    }
    create(request: AdminUpdateRequest): Observable<Admin> {
        this._app.startLoading(ADMIN_CREATE);
        return this.http.post(API_URLS.ADMINS, request).pipe(
            map((x: AdminDTO) => x),
            finalize(() => this._app.finishLoading(ADMIN_CREATE))
        );
    }
    getAdmin(id: string | number): Observable<Admin> {
        this._app.startLoading(ADMIN_FETCHING);
        return this.http.get(applyTemplate(API_URLS.ADMIN, { id })).pipe(
            map((x: AdminDTO) => x),
            finalize(() => this._app.finishLoading(ADMIN_FETCHING))
        );
    }
}

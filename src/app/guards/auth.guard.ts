import { combineLatest, Observable } from 'rxjs';

import { map, skipWhile } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

import { AdminService } from '../admin/admin.service';
import { AppService } from '../core/app/app.service';
import { CURRENT_ADMIN_FETCHING } from '../admin/admin.constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private _adminService: AdminService,
        private _router: Router,
        private _appService: AppService
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> {
        if (
            this._adminService.getCurrent() === null &&
            !this._appService.isLoading(CURRENT_ADMIN_FETCHING)
        ) {
            this._adminService.fetchCurrent();
        }
        return combineLatest(
            this._adminService.admin$,
            this._appService.isLoading$(CURRENT_ADMIN_FETCHING)
        ).pipe(
            skipWhile(([admin, loading]) => {
                return loading;
            }),
            map(([admin]) => !!admin)
        );
    }
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

import { AdminService } from '../admin/admin.service';
import { AppService } from '../core/app/app.service';
import { getValue } from '../utils';
import { AuthService } from '../core/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private _adminService: AdminService,
        private _router: Router,
        private authService: AuthService
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> {
        if (this.authService.getAuthToken()) {
            this._router.navigate(['/']);
        }
        return true;
    }
}

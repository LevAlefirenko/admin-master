import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, TokenScheme } from './auth.interfaces';
import { TOKENS_STORAGE_KEY } from './auth.constants';
import { API_URLS } from '../../constants';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { CoreModule } from '../core.module';
import { getValue } from '../../utils';
import { AdminService } from '../../admin/admin.service';

@Injectable({
    providedIn: CoreModule,
})
export class AuthService {
    constructor(
        private _http: HttpClient,
        private _adminService: AdminService,
        private _router: Router
    ) {}

    public getAuthToken() {
        const storeTokens = this.getStoreTokens();
        if (storeTokens) {
            return storeTokens.authToken;
        }
        return null;
    }

    public getRefreshToken() {
        const storeTokens = this.getStoreTokens();
        if (storeTokens) {
            return storeTokens.refreshToken;
        }
        return null;
    }

    public logout(remember = false) {
        this.removeStoreTokens();
        this._router.navigate(['/login'], {
            queryParams: remember ? { returnUrl: this._router.url } : null,
        });
    }

    public removeStoreTokens() {
        localStorage.removeItem(TOKENS_STORAGE_KEY);
    }

    public storeTokens(tokens: TokenScheme) {
        localStorage.setItem(
            TOKENS_STORAGE_KEY,
            JSON.stringify(
                Object.assign({}, this.getStoreTokens() || {}, tokens)
            )
        );
    }

    public getStoreTokens(): TokenScheme {
        return JSON.parse(localStorage.getItem(TOKENS_STORAGE_KEY));
    }

    public authorize(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this._http
            .post(API_URLS.LOGIN, JSON.stringify(loginRequest))
            .pipe(
                map((data: LoginResponse) => {
                    this.storeTokens({
                        refreshToken: data.refresh,
                        authToken: data.token,
                    });
                    return data;
                })
            );
    }

    public refreshAuthToken(): Observable<any> {
        const currentUser = getValue(this._adminService.admin$);
        if (!this.getStoreTokens()) {
            return throwError('No credentials');
        }
        return this._http.post(
            API_URLS.REFRESH_TOKEN,
            JSON.stringify({
                refresh: this.getRefreshToken(),
            })
        );
    }
}

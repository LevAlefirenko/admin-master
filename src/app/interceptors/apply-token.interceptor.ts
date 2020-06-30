import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

@Injectable()
export class ApplyTokenInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.indexOf(API_URL) === -1) {
            return next.handle(req);
        }
        const cloneReq = req.clone({
            headers: req.headers.set(
                'Authorization',
                `Bearer ${this._authService.getAuthToken()}`
            ),
        });
        return next.handle(cloneReq);
    }
}

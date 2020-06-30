import {
    HttpClient,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Subscriber, Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

import { AuthService } from '../core/auth/auth.service';
import { LoginResponse } from '../core/auth/auth.interfaces';
import { API_URL } from '../constants';
import { finalize } from 'rxjs/operators';

type CallerRequest = {
    subscriber: Subscriber<any>;
    failedRequest: HttpRequest<any>;
};

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    private refreshInProgress: boolean;
    private requests: CallerRequest[] = [];
    private _http: HttpClient;

    constructor(
        private injector: Injector,
        private _authService: AuthService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.indexOf(API_URL) === -1) {
            return next.handle(req);
        }

        if (!this._http) {
            this._http = this.injector.get(HttpClient);
        }

        return new Observable<HttpEvent<any>>(subscriber => {
            let originalRequestSubscription = next.handle(req).subscribe(
                response => {
                    subscriber.next(response);
                },
                err => {
                    if (err.status === 401) {
                        this.handleUnauthorizedError(subscriber, req);
                    } else {
                        subscriber.error(err);
                    }
                },
                () => {
                    subscriber.complete();
                }
            );

            return () => {
                originalRequestSubscription.unsubscribe();
            };
        });
    }

    private handleUnauthorizedError(
        subscriber: Subscriber<any>,
        request: HttpRequest<any>
    ) {
        this.requests.push({ subscriber, failedRequest: request });
        if (!this.refreshInProgress) {
            this.refreshInProgress = true;
            this._authService
                .refreshAuthToken()
                .pipe(
                    finalize(() => {
                        this.refreshInProgress = false;
                    })
                )
                .subscribe(
                    (tokens: LoginResponse) => {
                        this._authService.storeTokens({
                            authToken: tokens.token,
                            refreshToken: tokens.refresh,
                        });
                        this.repeatFailedRequests(
                            this._authService.getAuthToken()
                        );
                    },
                    err => {
                        this.requests.forEach(request => {
                            request.subscriber.error(err);
                        });
                        this._authService.logout(true);
                    }
                );
        }
    }

    private repeatFailedRequests(accessToken: string) {
        this.requests.forEach(c => {
            const requestWithNewToken = c.failedRequest.clone({
                headers: c.failedRequest.headers.set(
                    'Authorization',
                    `Bearer ${this._authService.getAuthToken()}`
                ),
            });
            this.repeatRequest(requestWithNewToken, c.subscriber);
        });
        this.requests = [];
    }

    private repeatRequest(
        requestWithNewToken: HttpRequest<any>,
        subscriber: Subscriber<any>
    ) {
        this._http.request(requestWithNewToken).subscribe(
            res => {
                subscriber.next(res);
            },
            err => {
                subscriber.error(err);
            },
            () => {
                subscriber.complete();
            }
        );
    }
}

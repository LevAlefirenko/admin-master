import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService } from '../core/app/app.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    constructor(private _appService: AppService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const _url = req.url.split('?')[0];
        this._appService.cleanServerError(_url);
        return next.handle(req).pipe(
            catchError(err => {
                if (err && err.status >= 500) {
                    this._appService.addServerError(_url);
                }
                return observableThrowError(err);
            })
        );
    }
}

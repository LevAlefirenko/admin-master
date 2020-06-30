import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT_ENTRY } from '../constants';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.indexOf(ENDPOINT_ENTRY) === -1) {
            return next.handle(req);
        }
        const cloneReq = req.clone({
            headers: req.headers.set(
                'Content-Type',
                'application/json; charset=utf-8'
            ),
        });
        return next.handle(cloneReq);
    }
}

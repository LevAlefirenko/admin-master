import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { API_URLS, Status } from '../../constants';
import { AppService } from '../../core/app/app.service';
import { Jobseeker } from '../../models';
import { CV } from '../../models/cv.model';
import { applyTemplate } from '../../utils';
import {
    JOBSEEKER_CHANGE_STATUS,
    JOBSEEKER_CVS_FETCHING,
    JOBSEEKER_FETCHING,
} from './jobseekers.constants';

@Injectable()
export class JobseekersService {
    constructor(private http: HttpClient, private _app: AppService) {}

    getJobseeker(id: string): Observable<Jobseeker> {
        this._app.startLoading(JOBSEEKER_FETCHING);
        return this.http.get(applyTemplate(API_URLS.JOBSEEKER, { id })).pipe(
            map((res: Jobseeker) => res),
            finalize(() => this._app.finishLoading(JOBSEEKER_FETCHING))
        );
    }

    getCVs(id: string): Observable<CV[]> {
        this._app.startLoading(JOBSEEKER_CVS_FETCHING);
        return this.http
            .get(applyTemplate(API_URLS.JOBSEEKER_CVS, { id }))
            .pipe(
                map((cvs: CV[]) => cvs),
                finalize(() => this._app.finishLoading(JOBSEEKER_CVS_FETCHING))
            );
    }

    changeStatus(id: string, status: Status): Observable<void | Object> {
        this._app.startLoading(JOBSEEKER_CHANGE_STATUS);
        return this.http
            .put(applyTemplate(API_URLS.JOBSEEKER_CHANGE_STATUS, { id }), {
                status,
            })
            .pipe(
                finalize(() => this._app.finishLoading(JOBSEEKER_CHANGE_STATUS))
            );
    }
}

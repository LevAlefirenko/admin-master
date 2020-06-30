import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { API_URLS, Status } from '../../constants';
import { AppService } from '../../core/app/app.service';
import { IEmployer, IVacancy } from '../../models';
import { applyTemplate } from '../../utils';
import {
    EMPLOYER_CHANGE_STATUS,
    EMPLOYER_FETCHING,
    EMPLOYER_VACANCIES_FETCHING,
} from './employers.constants';

@Injectable()
export class EmployersService {
    constructor(private http: HttpClient, private _app: AppService) {}

    getEmployer(id: string): Observable<IEmployer> {
        this._app.startLoading(EMPLOYER_FETCHING);
        return this.http.get(applyTemplate(API_URLS.EMPLOYER, { id })).pipe(
            map((res: IEmployer) => res),
            finalize(() => this._app.finishLoading(EMPLOYER_FETCHING))
        );
    }

    getEmployerVacancies(id: string): Observable<IVacancy[]> {
        this._app.startLoading(EMPLOYER_VACANCIES_FETCHING);
        return this.http
            .get(applyTemplate(API_URLS.EMPLOYER_VACANCIES, { id }))
            .pipe(
                map((vacancies: IVacancy[]) => vacancies),
                finalize(() =>
                    this._app.finishLoading(EMPLOYER_VACANCIES_FETCHING)
                )
            );
    }

    changeStatus(id: string, status: Status): Observable<void | Object> {
        this._app.startLoading(EMPLOYER_CHANGE_STATUS);
        return this.http
            .put(applyTemplate(API_URLS.EMPLOYER_CHANGE_STATUS, { id }), {
                status,
            })
            .pipe(
                finalize(() => this._app.finishLoading(EMPLOYER_CHANGE_STATUS))
            );
    }
}

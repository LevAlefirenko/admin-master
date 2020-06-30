import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { API_URLS, Status } from '../../constants';
import { AppService } from '../../core/app/app.service';
import { IVacancyData } from '../../models';
import { applyTemplate } from '../../utils';
import { VACANCY_CHANGE_STATUS, VACANCY_FETCHING } from './vacancies.constants';

@Injectable()
export class VacanciesService {
    constructor(private http: HttpClient, private _app: AppService) {}

    getVacancy(id: string): Observable<IVacancyData> {
        this._app.startLoading(VACANCY_FETCHING);
        return this.http.get(applyTemplate(API_URLS.VACANCY, { id })).pipe(
            map((res: IVacancyData) => res),
            finalize(() => this._app.finishLoading(VACANCY_FETCHING))
        );
    }

    changeStatus(id: string, status: Status): Observable<void | Object> {
        this._app.startLoading(VACANCY_CHANGE_STATUS);
        return this.http
            .put(applyTemplate(API_URLS.VACANCY_CHANGE_STATUS, { id }), {
                status,
            })
            .pipe(
                finalize(() => this._app.finishLoading(VACANCY_CHANGE_STATUS))
            );
    }
}

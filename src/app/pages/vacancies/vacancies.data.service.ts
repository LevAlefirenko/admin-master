import { CurrencyPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {
    ACTION_TITLE,
    ActionType,
    SortDirection,
} from '../../components/table';
import { ActionDefinition } from '../../components/table';
import { API_URLS, CURRENCY_CODE, Status } from '../../constants';
import { AppService } from '../../core/app/app.service';
import {
    DataService,
    IPageData,
    IVacanciesPageData,
    IVacanciesRequestParams,
    IVacancy,
    IVacancyData,
    IVacancyListItem,
} from '../../models';
import { VACANCIES_FETCHING } from './vacancies.constants';
import { composeHttpParams } from '../../utils';

@Injectable()
export class VacanciesDataService extends DataService {
    constructor(
        private http: HttpClient,
        private _app: AppService,
        private currencyPipe: CurrencyPipe
    ) {
        super();
    }

    private currencyCode = CURRENCY_CODE;

    getData(
        params: IVacanciesRequestParams
    ): Observable<IPageData<IVacancyListItem>> {
        const {
            searchText,
            title = SortDirection.DEFAULT,
            company = SortDirection.DEFAULT,
            salaryRange = SortDirection.DEFAULT,
            createdAt = SortDirection.DEFAULT,
            status,
            offset,
            limit,
        } = params;

        this._app.startLoading(VACANCIES_FETCHING);
        return this.http
            .get(API_URLS.VACANCIES, {
                params: composeHttpParams({
                    searchText,
                    status,
                    titleOrder: title,
                    companyOrder: company,
                    salaryOrder: salaryRange,
                    creationDate: createdAt,
                    offset,
                    limit,
                }),
            })
            .pipe(
                map((res: IVacanciesPageData) => {
                    return {
                        records: res.vacancies.map(
                            this._toVacanciesListItem.bind(this)
                        ),
                        total: res.total,
                    } as IPageData<IVacancyListItem>;
                }),
                finalize(() => this._app.finishLoading(VACANCIES_FETCHING))
            );
    }

    private _toVacanciesListItem(vacancyData: IVacancyData): IVacancyListItem {
        return {
            id: vacancyData.vacancy.id,
            status: vacancyData.vacancy.status,
            actions: this._getVacancyActions(vacancyData.vacancy),
            title: vacancyData.vacancy.title,
            createdAt: vacancyData.vacancy.createdAt,
            salaryRange: this._getSalaryRange(vacancyData.vacancy),
            company: vacancyData.employer.company,
        };
    }

    private _getVacancyActions(vacancy: IVacancy): ActionDefinition[] {
        let actions: ActionDefinition[] = [];

        switch (vacancy.status) {
            case Status.BLOCKED:
                actions = [
                    ...actions,
                    {
                        title: ACTION_TITLE[ActionType.UNLOCK],
                        type: ActionType.UNLOCK,
                    },
                ];
                break;
            case Status.ACTIVE:
                actions = [
                    ...actions,
                    {
                        title: ACTION_TITLE[ActionType.BLOCK],
                        type: ActionType.BLOCK,
                    },
                ];
                break;
            case Status.MODERATION:
                actions = [
                    ...actions,
                    {
                        title: ACTION_TITLE[ActionType.ACTIVATE],
                        type: ActionType.ACTIVATE,
                    },
                    {
                        title: ACTION_TITLE[ActionType.BLOCK],
                        type: ActionType.BLOCK,
                    },
                ];
                break;
        }
        actions = [
            ...actions,
            {
                title: ACTION_TITLE[ActionType.DETAILS],
                type: ActionType.DETAILS,
            },
        ];

        return actions;
    }

    private _getSalaryRange(vacancy: IVacancy): string {
        const salaryFrom = this.currencyPipe.transform(
            vacancy.salaryFrom,
            this.currencyCode
        );

        let result = `${salaryFrom}`;
        if (vacancy.salaryTo > 0) {
            const salaryTo = this.currencyPipe.transform(
                vacancy.salaryTo,
                this.currencyCode
            );

            result = `${salaryFrom} - ${salaryTo}`;
        }
        return result;
    }
}

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
import { DataService, IPageData } from '../../models';
import { CVListItem } from '../../models/cv.model';
import { CVS_FETCHING } from './cv.constants';
import { CVDTO, CVPageDataDTO, CVsRequestParams } from './cvs.interfaces';
import { composeHttpParams } from '../../utils';

@Injectable()
export class CVsDataService extends DataService {
    constructor(
        private http: HttpClient,
        private _app: AppService,
        private currencyPipe: CurrencyPipe
    ) {
        super();
    }

    private currencyCode = CURRENCY_CODE;

    getData(params: CVsRequestParams): Observable<IPageData<CVListItem>> {
        const {
            searchText,
            name = SortDirection.DEFAULT,
            position = SortDirection.DEFAULT,
            salaryRange = SortDirection.DEFAULT,
            createdAt = SortDirection.DEFAULT,
            status,
            offset,
            limit,
        } = params;

        this._app.startLoading(CVS_FETCHING);
        return this.http
            .get(API_URLS.CVS, {
                params: composeHttpParams({
                    searchText,
                    status,
                    nameOrder: name,
                    positionOrder: position,
                    salaryOrder: salaryRange,
                    creationDateOrder: createdAt,
                    offset,
                    limit,
                }),
            })
            .pipe(
                map((res: CVPageDataDTO) => {
                    return {
                        records: res.cvs.map(cvDTO => ({
                            id: cvDTO.cv.id,
                            status: cvDTO.cv.status,
                            name: cvDTO.jobseeker.name,
                            salaryRange: this._getSalaryRange(cvDTO.cv),
                            position: cvDTO.cv.position,
                            createdAt: cvDTO.cv.updated,
                            actions: this._getCVActions(cvDTO.cv),
                        })),
                        total: res.total,
                    };
                }),
                finalize(() => this._app.finishLoading(CVS_FETCHING))
            );
    }

    private _getCVActions(cv: CVDTO): ActionDefinition[] {
        let actions: ActionDefinition[] = [];

        switch (cv.status) {
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

    private _getSalaryRange(cv: CVDTO): string {
        const salaryFrom = this.currencyPipe.transform(
            cv.salaryFrom,
            this.currencyCode
        );

        let result = `${salaryFrom}`;
        if (cv.salaryTo > 0) {
            const salaryTo = this.currencyPipe.transform(
                cv.salaryTo,
                this.currencyCode
            );

            result = `${salaryFrom} - ${salaryTo}`;
        }
        return result;
    }
}

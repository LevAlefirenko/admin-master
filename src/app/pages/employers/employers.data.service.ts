import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { API_URLS, Status } from '../../constants';
import { AppService } from '../../core/app/app.service';
import { DataService, IEmployer, IPageData } from '../../models';
import {
    ACTION_TITLE,
    ActionDefinition,
    ActionType,
    SortDirection,
} from '../../components/table';
import { EMPLOYERS_FETCHING } from './employers.constants';
import {
    EmployerDTO,
    EmployersPageDataDTO,
    IEmployersRequestParams,
} from './employers.interfaces';
import { composeHttpParams } from '../../utils';

@Injectable()
export class EmployersDataService extends DataService {
    constructor(private http: HttpClient, private _app: AppService) {
        super();
    }

    getData(params: IEmployersRequestParams): Observable<IPageData<IEmployer>> {
        const {
            searchText,
            name = SortDirection.DEFAULT,
            company = SortDirection.DEFAULT,
            createdAt = SortDirection.DEFAULT,
            status,
            offset,
            limit,
        } = params;

        this._app.startLoading(EMPLOYERS_FETCHING);
        return this.http
            .get(API_URLS.EMPLOYERS, {
                params: composeHttpParams({
                    searchText,
                    status,
                    nameOrder: name,
                    registrationDate: createdAt,
                    companyOrder: company,
                    offset,
                    limit,
                }),
            })
            .pipe(
                map((res: EmployersPageDataDTO) => {
                    return {
                        records: res.employers.map(emp => ({
                            ...emp,
                            actions: this._getEmployerActions(emp),
                        })),
                        total: res.total,
                    };
                }),
                finalize(() => this._app.finishLoading(EMPLOYERS_FETCHING))
            );
    }

    private _getEmployerActions(employer: EmployerDTO): ActionDefinition[] {
        let actions = [];

        if (employer.status === Status.BLOCKED) {
            actions = [
                ...actions,
                {
                    title: ACTION_TITLE[ActionType.UNLOCK],
                    type: ActionType.UNLOCK,
                },
            ];
        } else if (employer.status === Status.ACTIVE) {
            actions = [
                ...actions,
                {
                    title: ACTION_TITLE[ActionType.BLOCK],
                    type: ActionType.BLOCK,
                },
            ];
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
}

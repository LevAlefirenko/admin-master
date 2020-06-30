import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { API_URLS } from '../../../constants';
import { AppService } from '../../../core/app/app.service';
import { AdminListItem, DataService, IPageData } from '../../../models';
import { AdminPageDataDTO, AdminsRequestParams } from './admins.interfaces';
import { ADMINS_FETCHING } from './admins.constants';
import {
    ACTION_TITLE,
    ActionType,
    SortDirection,
} from '../../../components/table';
import { composeHttpParams } from '../../../utils';

@Injectable()
export class AdminsDataService extends DataService {
    constructor(private http: HttpClient, private _app: AppService) {
        super();
    }

    getData(params: AdminsRequestParams): Observable<IPageData<AdminListItem>> {
        const { login = SortDirection.ASCENDING, limit, offset } = params;
        this._app.startLoading(ADMINS_FETCHING);
        return this.http
            .get(API_URLS.ADMINS, {
                params: composeHttpParams({
                    loginOrder: login,
                    offset,
                    limit,
                }),
            })
            .pipe(
                map((res: AdminPageDataDTO) => {
                    return {
                        records: res.admins.map(admin => ({
                            ...admin,
                            actions: [
                                {
                                    title: ACTION_TITLE[ActionType.EDIT],
                                    type: ActionType.EDIT,
                                },
                                {
                                    title: ACTION_TITLE[ActionType.REMOVE],
                                    type: ActionType.REMOVE,
                                },
                            ],
                        })),
                        total: res.total,
                    };
                }),
                finalize(() => this._app.finishLoading(ADMINS_FETCHING))
            );
    }
}

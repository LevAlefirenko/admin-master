import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {
    ACTION_TITLE,
    ActionDefinition,
    ActionType,
    SortDirection,
} from '../../components/table';
import { API_URLS, Status } from '../../constants';
import { AppService } from '../../core/app/app.service';
import { Complaint, DataService, IPageData } from '../../models';
import { COMPLAINTS_FETCHING } from './complaints.constants';
import {
    ComplaintDTO,
    ComplaintPageDataDTO,
    ComplaintRequestParams,
} from './complaints.interfaces';
import { composeHttpParams } from '../../utils';

@Injectable()
export class ComplaintsDataService extends DataService {
    constructor(private http: HttpClient, private _app: AppService) {
        super();
    }

    getData(params: ComplaintRequestParams): Observable<IPageData<Complaint>> {
        const {
            searchText,
            origin = SortDirection.DEFAULT,
            date = SortDirection.DEFAULT,
            text = SortDirection.DEFAULT,
            status,
            offset,
            limit,
        } = params;

        this._app.startLoading(COMPLAINTS_FETCHING);
        return this.http
            .get(API_URLS.COMPLAINTS, {
                params: composeHttpParams({
                    searchText,
                    status,
                    dateOrder: date,
                    textOrder: text,
                    phoneOrder: origin,
                    offset,
                    limit,
                }),
            })
            .pipe(
                map((res: ComplaintPageDataDTO) => {
                    return {
                        records: res.complaints.map(complaintDTO => {
                            return {
                                ...complaintDTO,
                                reason: complaintDTO.reason.name,
                                origin: complaintDTO.origin.phone,
                                actions: this._getComplaintActions(
                                    complaintDTO
                                ),
                            };
                        }),
                        total: res.total,
                    };
                }),
                finalize(() => this._app.finishLoading(COMPLAINTS_FETCHING))
            );
    }

    private _getComplaintActions(
        complaintDTO: ComplaintDTO
    ): ActionDefinition[] {
        let actions: ActionDefinition[] = [];

        switch (complaintDTO.status) {
            case Status.ACTIVE:
                actions = [
                    ...actions,
                    {
                        title: ACTION_TITLE[ActionType.ARCHIVE],
                        type: ActionType.ARCHIVE,
                    },
                ];
                break;
            case Status.ARCHIVED:
                actions = [
                    ...actions,
                    {
                        title: ACTION_TITLE[ActionType.ACTIVATE],
                        type: ActionType.ACTIVATE,
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
}

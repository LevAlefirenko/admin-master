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
import {
    DataService,
    IPageData,
    Jobseeker,
    JobseekersRequestParams,
} from '../../models';
import { JOBSEEKERS_FETCHING } from './jobseekers.constants';
import { JobseekerDTO, JobseekersPageDataDTO } from './jobseeker.interfaces';
import { composeHttpParams } from '../../utils';

@Injectable()
export class JobseekersDataService extends DataService {
    constructor(private http: HttpClient, private _app: AppService) {
        super();
    }

    getData(params: JobseekersRequestParams): Observable<IPageData<Jobseeker>> {
        const {
            searchText,
            name = SortDirection.DEFAULT,
            createdAt = SortDirection.DEFAULT,
            status,
            offset,
            limit,
        } = params;

        this._app.startLoading(JOBSEEKERS_FETCHING);
        return this.http
            .get(API_URLS.JOBSEEKERS, {
                params: composeHttpParams({
                    searchText,
                    status,
                    limit,
                    offset,
                    nameOrder: name,
                    registrationDate: createdAt,
                }),
            })
            .pipe(
                map((res: JobseekersPageDataDTO) => {
                    return {
                        records: res.jobseekers.map(x => ({
                            ...x,
                            actions: this._getJobseekerActions(x),
                        })),
                        total: res.total,
                    };
                }),
                finalize(() => this._app.finishLoading(JOBSEEKERS_FETCHING))
            );
    }

    private _getJobseekerActions(jobseeker: JobseekerDTO): ActionDefinition[] {
        let actions: ActionDefinition[] = [];

        switch (jobseeker.status) {
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

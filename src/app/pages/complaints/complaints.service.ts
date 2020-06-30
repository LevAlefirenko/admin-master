import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { API_URLS, Status } from '../../constants';
import { AppService } from '../../core/app/app.service';
import {
    ComplaintReason,
    ComplaintType,
    ExtendedComplaint,
} from '../../models';
import { applyTemplate } from '../../utils';
import { GO_TO_CV_LINK } from '../jobseekers/jobseekers.constants';
import { GO_TO_EMPLOYER_LINK } from '../vacancies/vacancies.constants';
import {
    COMPLAINT_CHANGE_STATUS,
    COMPLAINT_FETCHING,
} from './complaints.constants';
import { ComplaintDTO } from './complaints.interfaces';
import { CVDTO } from '../cvs/cvs.interfaces';

@Injectable()
export class ComplaintsService {
    constructor(private http: HttpClient, private _app: AppService) {}

    getComplaint(id: string): Observable<ExtendedComplaint> {
        this._app.startLoading(COMPLAINT_FETCHING);
        return this.http.get(applyTemplate(API_URLS.COMPLAINT, { id })).pipe(
            map((complaint: ComplaintDTO) => {
                return {
                    ...complaint,
                    reason: this.getComplaintReason(complaint),
                    origin: {
                        name: complaint.origin.name,
                        phone: complaint.origin.phone,
                        email: complaint.origin.email,
                    },
                };
            }),
            finalize(() => this._app.finishLoading(COMPLAINT_FETCHING))
        );
    }

    changeStatus(id: string, status: Status): Observable<void | Object> {
        this._app.startLoading(COMPLAINT_CHANGE_STATUS);
        return this.http
            .put(applyTemplate(API_URLS.COMPLAINT_CHANGE_STATUS, { id }), {
                status,
            })
            .pipe(
                finalize(() => this._app.finishLoading(COMPLAINT_CHANGE_STATUS))
            );
    }

    private getComplaintReason(complaintDTO: ComplaintDTO): ComplaintReason {
        return {
            title: this.getComplaintReasonTitle(complaintDTO),
            href: this.getComplaintReasonHref(complaintDTO),
        };
    }

    private getComplaintReasonHref(complaintDTO: ComplaintDTO): string {
        let goToReasonLink = '';
        switch (complaintDTO.type) {
            case ComplaintType.CV:
                goToReasonLink = GO_TO_CV_LINK;
                break;
            case ComplaintType.EMPLOYER:
                goToReasonLink = GO_TO_EMPLOYER_LINK;
                break;
        }
        return applyTemplate(goToReasonLink, { id: complaintDTO.reason.id });
    }

    private getComplaintReasonTitle(complaintDTO: ComplaintDTO): string {
        let result = '';
        switch (complaintDTO.type) {
            case ComplaintType.CV:
                result = (complaintDTO.reason as CVDTO).position;
                break;
            case ComplaintType.EMPLOYER:
                result = complaintDTO.reason.name;
                break;
        }
        return result;
    }
}

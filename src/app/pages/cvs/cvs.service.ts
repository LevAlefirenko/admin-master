import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {
    API_URLS,
    LegalDocument,
    LocalizedDocumentNames,
    LocalizedEducationNames,
    Status,
} from '../../constants';
import { AppService } from '../../core/app/app.service';
import {
    ExtendedCV,
    LocalizedEmploymentType,
    LocalizedSchedule,
} from '../../models/cv.model';
import { applyTemplate } from '../../utils';
import { CV_CHANGE_STATUS, CV_FETCHING } from './cv.constants';
import { ExtendedCVDTO } from './cvs.interfaces';

@Injectable()
export class CVsService {
    constructor(private http: HttpClient, private _app: AppService) {}

    getCV(id: string): Observable<ExtendedCV> {
        this._app.startLoading(CV_FETCHING);
        return this.http.get(applyTemplate(API_URLS.CV, { id })).pipe(
            map((cvDTO: ExtendedCVDTO) => {
                return {
                    cv: {
                        ...cvDTO.cv,
                        documents: cvDTO.cv.documents.map(
                            (doc: LegalDocument) => LocalizedDocumentNames[doc]
                        ),
                        education: LocalizedEducationNames[cvDTO.cv.education],
                        employmentType:
                            LocalizedEmploymentType[cvDTO.cv.employmentType],
                        schedule: LocalizedSchedule[cvDTO.cv.schedule],
                    },
                    jobseeker: cvDTO.jobseeker,
                };
            }),
            finalize(() => this._app.finishLoading(CV_FETCHING))
        );
    }

    changeStatus(id: string, status: Status): Observable<void | Object> {
        this._app.startLoading(CV_CHANGE_STATUS);
        return this.http
            .put(applyTemplate(API_URLS.CV_CHANGE_STATUS, { id }), {
                status,
            })
            .pipe(finalize(() => this._app.finishLoading(CV_CHANGE_STATUS)));
    }
}

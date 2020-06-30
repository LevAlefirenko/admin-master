import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { API_URLS } from '../../constants';
import { AppService } from '../../core/app/app.service';
import { DropdownDataService, DropdownOption } from '../../models';
import { PayableServiceDTO } from '../payable-services/payable-services.interfaces';
import { PAYABLE_SERVICES_DROPDOWN_DATA_FETCHING } from './purchases.constants';

@Injectable()
export class PurchasesDropdownDataService extends DropdownDataService {
    constructor(private http: HttpClient, private _app: AppService) {
        super();
    }

    getOptions(): Observable<DropdownOption[]> {
        this._app.startLoading(PAYABLE_SERVICES_DROPDOWN_DATA_FETCHING);
        return this.http.get(API_URLS.PAYABLE_SERVICES).pipe(
            map((res: PayableServiceDTO[]) => {
                return res.map(payableServiceDTO => {
                    return {
                        value: payableServiceDTO.id,
                        displayName: payableServiceDTO.name,
                    };
                });
            }),
            finalize(() =>
                this._app.finishLoading(PAYABLE_SERVICES_DROPDOWN_DATA_FETCHING)
            )
        );
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { SortDirection } from '../../components/table';
import { API_URLS } from '../../constants';
import { AppService } from '../../core/app/app.service';
import { DataService, IPageData } from '../../models';
import { Purchase, PurchasesRequestParams } from '../../models/purchases.model';
import { PURCHASES_FETCHING } from './purchases.constants';
import { PurchasesPageDataDTO } from './purchases.interfaces';
import { composeHttpParams } from '../../utils';

@Injectable()
export class PurchasesDataService extends DataService {
    constructor(private http: HttpClient, private _app: AppService) {
        super();
    }

    getData(params: PurchasesRequestParams): Observable<IPageData<Purchase>> {
        const {
            searchText,
            date = SortDirection.DEFAULT,
            service = SortDirection.DEFAULT,
            money = SortDirection.DEFAULT,
            name = SortDirection.DEFAULT,
            selectedValue,
            offset,
            limit,
        } = params;

        let httpParams = composeHttpParams({
            employerName: searchText,
            serviceOrder: service,
            limit,
            offset,
            moneyOrder: money,
            nameOrder: name,
            dateOrder: date,
        });

        if (selectedValue) {
            httpParams = httpParams.set('serviceID', selectedValue);
        }

        this._app.startLoading(PURCHASES_FETCHING);
        return this.http
            .get(API_URLS.PURCHASES, {
                params: httpParams,
            })
            .pipe(
                map((res: PurchasesPageDataDTO) => {
                    return {
                        records: res.purchases.map(purchaseDTO => {
                            return {
                                id: purchaseDTO.id,
                                date: purchaseDTO.date,
                                money: purchaseDTO.money,
                                service: purchaseDTO.service.name,
                                name: purchaseDTO.buyer.name,
                            };
                        }),
                        total: res.total,
                    };
                }),
                finalize(() => this._app.finishLoading(PURCHASES_FETCHING))
            );
    }
}

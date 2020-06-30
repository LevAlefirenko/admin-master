import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {
    ACTION_TITLE,
    ActionDefinition,
    ActionType,
} from '../../components/table';
import { API_URLS, CURRENCY_CODE, Status } from '../../constants';
import { AppService } from '../../core/app/app.service';
import {
    ExtendedPayableService,
    PayableServiceData,
    PayableServiceListItem,
} from '../../models';
import { applyTemplate } from '../../utils';
import {
    PAYABLE_SERVICE_CHANGE_STATUS,
    PAYABLE_SERVICE_FETCHING,
    PAYABLE_SERVICE_UPDATING,
    PAYABLE_SERVICES_FETCHING,
} from './payable-services.constants';
import { PayableServiceDTO } from './payable-services.interfaces';
import { CurrencyPipe } from '@angular/common';

@Injectable()
export class PayableServicesService {
    private currencyCode: string = CURRENCY_CODE;

    constructor(
        private http: HttpClient,
        private _app: AppService,
        private currencyPipe: CurrencyPipe
    ) {}

    getData(): Observable<PayableServiceListItem[]> {
        this._app.startLoading(PAYABLE_SERVICES_FETCHING);
        return this.http.get(API_URLS.PAYABLE_SERVICES).pipe(
            map((res: PayableServiceDTO[]) =>
                res.map(payableServiceDTO =>
                    this.mapToListItem(payableServiceDTO)
                )
            ),
            finalize(() => this._app.finishLoading(PAYABLE_SERVICES_FETCHING))
        );
    }

    getPayableService(id: string): Observable<ExtendedPayableService> {
        this._app.startLoading(PAYABLE_SERVICE_FETCHING);
        return this.http
            .get(applyTemplate(API_URLS.PAYABLE_SERVICE, { id }))
            .pipe(
                map((payableServiceDTO: PayableServiceDTO) => {
                    return { ...payableServiceDTO };
                }),
                finalize(() =>
                    this._app.finishLoading(PAYABLE_SERVICE_FETCHING)
                )
            );
    }

    updatePayableService(
        id: string,
        payableService: PayableServiceData
    ): Observable<ExtendedPayableService> {
        this._app.startLoading(PAYABLE_SERVICE_UPDATING);
        return this.http
            .put(applyTemplate(API_URLS.PAYABLE_SERVICE, { id }), {
                service: { ...payableService },
            })
            .pipe(
                map((payableServiceDTO: PayableServiceDTO) => {
                    return { ...payableServiceDTO };
                }),
                finalize(() =>
                    this._app.finishLoading(PAYABLE_SERVICE_UPDATING)
                )
            );
    }

    changeStatus(id: string, status: Status): Observable<void | Object> {
        this._app.startLoading(PAYABLE_SERVICE_CHANGE_STATUS);
        return this.http
            .put(
                applyTemplate(API_URLS.PAYABLE_SERVICE_CHANGE_STATUS, { id }),
                {
                    status,
                }
            )
            .pipe(
                finalize(() =>
                    this._app.finishLoading(PAYABLE_SERVICE_CHANGE_STATUS)
                )
            );
    }

    private mapToListItem(
        payableServiceDTO: PayableServiceDTO
    ): PayableServiceListItem {
        return {
            id: payableServiceDTO.id,
            status: payableServiceDTO.status,
            name: payableServiceDTO.name,
            minCost: this._getMinCost(payableServiceDTO),
            paymentAmount: this.currencyPipe.transform(
                payableServiceDTO.firstPeriodCost,
                this.currencyCode
            ),
            createdAt: payableServiceDTO.createdAt,
            actions: this._getPayableServiceActions(payableServiceDTO),
        };
    }

    private _getMinCost(payableService: PayableServiceDTO): string {
        const minConst = Math.min(
            payableService.firstPeriodCost,
            payableService.secondPeriodCost,
            payableService.thirdPeriodCost
        );
        return this.currencyPipe.transform(minConst, this.currencyCode);
    }

    private _getPayableServiceActions(
        payableService: PayableServiceDTO
    ): ActionDefinition[] {
        let actions: ActionDefinition[] = [];

        switch (payableService.status) {
            case Status.ACTIVE:
                actions = [
                    ...actions,
                    {
                        title: ACTION_TITLE[ActionType.SWITCH_OFF],
                        type: ActionType.BLOCK,
                    },
                ];
                break;
            case Status.BLOCKED:
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

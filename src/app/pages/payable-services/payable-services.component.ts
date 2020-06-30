import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import {
    ConfirmationDialogComponent,
    ConfirmationResult,
} from '../../components/confirmation-dialog';
import { DataPanelComponent } from '../../components/data-panel';
import { InformDialogComponent } from '../../components/inform-dialog';
import { SubscriberComponent } from '../../components/subscriber';
import {
    ActionButtonClickPayload,
    ActionType,
    ITableConfigModel,
} from '../../components/table';
import { MODAL_DIALOG_COMMON_WIDTH, Status } from '../../constants';
import { PayableServiceListItem } from '../../models';
import { getDialogData } from '../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    PAYABLE_SERVICES_TAB_HEADER,
    PAYABLE_SERVICES_TABLE_CONFIG,
    STATUS_CHANGED_DIALOG_DATA,
} from './payable-services.constants';
import { PayableServicesService } from './payable-services.service';

@Component({
    selector: 'app-payable-services',
    templateUrl: './payable-services.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayableServicesComponent extends SubscriberComponent
    implements OnInit {
    header = PAYABLE_SERVICES_TAB_HEADER;
    tableConfig: ITableConfigModel = PAYABLE_SERVICES_TABLE_CONFIG;
    dataSource: MatTableDataSource<PayableServiceListItem>;

    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;

    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    private actionButtonsCallbacks: {
        [key: string]: (payableServiceListItem: PayableServiceListItem) => void;
    } = {
        [ActionType.DETAILS]: x => this.proceedToPayableServiceDetailsPage(x),
        [ActionType.BLOCK]: x =>
            this.changePayableServiceStatus(
                x,
                Status.BLOCKED,
                ActionType.SWITCH_OFF
            ),
        [ActionType.ACTIVATE]: x =>
            this.changePayableServiceStatus(
                x,
                Status.ACTIVE,
                ActionType.ACTIVATE
            ),
    };

    constructor(
        private payableServicesService: PayableServicesService,
        private router: Router,
        private dialog: MatDialog,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.loadData();
    }

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonsCallbacks[payload.type](
            payload.dataEntity as PayableServiceListItem
        );
    }

    private proceedToPayableServiceDetailsPage(
        payableService: PayableServiceListItem
    ): void {
        this.router.navigate([
            '/payable-services',
            payableService.id,
            'details',
        ]);
    }

    private changePayableServiceStatus(
        payableService: PayableServiceListItem,
        status: Status,
        action: ActionType
    ): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(action, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this.payableServicesService
                        .changeStatus(payableService.id, status)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.dialog.open(InformDialogComponent, {
                                width: MODAL_DIALOG_COMMON_WIDTH,
                                data: this.statusChangedDialogData,
                            });
                            this.loadData();
                        });
                }
            });
    }

    private loadData(): void {
        this.payableServicesService
            .getData()
            .pipe(
                take(1),
                takeUntil(this.destroy$)
            )
            .subscribe((res: PayableServiceListItem[]) => {
                this.dataSource = new MatTableDataSource<
                    PayableServiceListItem
                >(res);
                this.changeDetectorRef.detectChanges();
            });
    }
}

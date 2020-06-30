import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
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
import { BaseDataSource } from '../../core/datasource';
import { Complaint } from '../../models';
import { getDialogData } from '../../utils';

import {
    COMPLAINTS_FILTER_BUTTONS_CONFIG,
    COMPLAINTS_SEARCH_INPUT_PLACEHOLDER,
    COMPLAINTS_TAB_HEADER,
    COMPLAINTS_TABLE_CONFIG,
    CONFIRMATION_DIALOG_BODY,
    STATUS_CHANGED_DIALOG_DATA,
} from './complaints.constants';
import { ComplaintsService } from './complaints.service';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BaseDataSource],
})
export class ComplaintsComponent extends SubscriberComponent {
    header = COMPLAINTS_TAB_HEADER;
    searchPlaceholder = COMPLAINTS_SEARCH_INPUT_PLACEHOLDER;

    filterButtonsGroupConfig = COMPLAINTS_FILTER_BUTTONS_CONFIG;
    tableConfig: ITableConfigModel = COMPLAINTS_TABLE_CONFIG;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;

    constructor(
        public dataSource: BaseDataSource,
        private router: Router,
        private dialog: MatDialog,
        private complaintsService: ComplaintsService
    ) {
        super();
    }

    private actionButtonsCallbacks: {
        [key: string]: (complaint: Complaint) => void;
    } = {
        [ActionType.DETAILS]: complaint =>
            this.proceedToComplaintDetailsPage(complaint),
        [ActionType.ARCHIVE]: complaint =>
            this.changeComplaintStatus(
                complaint,
                Status.ARCHIVED,
                ActionType.ARCHIVE
            ),
        [ActionType.ACTIVATE]: complaint =>
            this.changeComplaintStatus(
                complaint,
                Status.ACTIVE,
                ActionType.ACTIVATE
            ),
    };

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonsCallbacks[payload.type](
            payload.dataEntity as Complaint
        );
    }

    private proceedToComplaintDetailsPage(complaint: Complaint): void {
        this.router.navigate(['/complaints', complaint.id, 'details']);
    }

    private changeComplaintStatus(
        complaint: Complaint,
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
                    this.updateStatus(complaint.id, status);
                }
            });
    }

    private updateStatus(id: string, status: Status): void {
        this.complaintsService
            .changeStatus(id, status)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.dialog.open(InformDialogComponent, {
                    width: MODAL_DIALOG_COMMON_WIDTH,
                    data: this.statusChangedDialogData,
                });
                this.dataPanel.loadData(true);
            });
    }
}

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
import { BaseDataSource } from '../../core/datasource';
import { Jobseeker } from '../../models';
import { getDialogData } from '../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    JOBSEEKERS_FILTER_BUTTONS_CONFIG,
    JOBSEEKERS_SEARCH_INPUT_PLACEHOLDER,
    JOBSEEKERS_TAB_HEADER,
    JOBSEEKERS_TABLE_CONFIG,
    STATUS_CHANGED_DIALOG_DATA,
} from './jobseekers.constants';
import { JobseekersService } from './jobseekers.service';
import { MODAL_DIALOG_COMMON_WIDTH, Status } from '../../constants';

@Component({
    selector: 'app-jobseekers',
    templateUrl: './jobseekers.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BaseDataSource],
})
export class JobseekersComponent extends SubscriberComponent {
    header = JOBSEEKERS_TAB_HEADER;
    searchPlaceholder = JOBSEEKERS_SEARCH_INPUT_PLACEHOLDER;

    filterButtonsGroupConfig = JOBSEEKERS_FILTER_BUTTONS_CONFIG;
    tableConfig: ITableConfigModel = JOBSEEKERS_TABLE_CONFIG;

    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;

    private actionButtonsCallbacks: {
        [key: string]: (jobseeker: Jobseeker) => void;
    } = {
        [ActionType.DETAILS]: jobseeker =>
            this.proceedToJobseekerDetailsPage(jobseeker),
        [ActionType.BLOCK]: x =>
            this.changeJobseekersStatus(x, Status.BLOCKED, ActionType.BLOCK),
        [ActionType.UNLOCK]: x =>
            this.changeJobseekersStatus(x, Status.ACTIVE, ActionType.UNLOCK),
    };

    constructor(
        public dataSource: BaseDataSource,
        private router: Router,
        private dialog: MatDialog,
        private jobseekersService: JobseekersService
    ) {
        super();
    }

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonsCallbacks[payload.type](
            payload.dataEntity as Jobseeker
        );
    }

    private proceedToJobseekerDetailsPage(jobseeker: Jobseeker): void {
        this.router.navigate(['/jobseekers', jobseeker.id, 'details']);
    }

    private changeJobseekersStatus(
        jobseeker: Jobseeker,
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
                    this.jobseekersService
                        .changeStatus(jobseeker.id, status)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.dialog.open(InformDialogComponent, {
                                width: MODAL_DIALOG_COMMON_WIDTH,
                                data: this.statusChangedDialogData,
                            });
                            this.dataPanel.loadData(true);
                        });
                }
            });
    }
}

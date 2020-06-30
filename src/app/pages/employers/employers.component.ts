import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {
    ConfirmationDialogComponent,
    ConfirmationResult,
} from '../../components/confirmation-dialog';
import { BaseDataSource } from '../../core/datasource';
import {
    ActionButtonClickPayload,
    ActionType,
    ITableConfigModel,
} from '../../components/table';
import { IEmployer } from '../../models';
import { getDialogData } from '../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    EMPLOYERS_FILTER_BUTTONS_CONFIG,
    EMPLOYERS_SEARCH_INPUT_PLACEHOLDER,
    EMPLOYERS_TAB_HEADER,
    EMPLOYERS_TABLE_CONFIG,
    STATUS_CHANGED_DIALOG_DATA,
} from './employers.constants';
import { takeUntil } from 'rxjs/operators';
import { SubscriberComponent } from '../../components/subscriber';
import { EmployersService } from './employers.service';
import { InformDialogComponent } from '../../components/inform-dialog';
import { DataPanelComponent } from '../../components/data-panel';
import { MODAL_DIALOG_COMMON_WIDTH, Status } from '../../constants';

@Component({
    selector: 'app-employers',
    templateUrl: './employers.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BaseDataSource],
})
export class EmployersComponent extends SubscriberComponent {
    header = EMPLOYERS_TAB_HEADER;
    searchPlaceholder = EMPLOYERS_SEARCH_INPUT_PLACEHOLDER;

    filterButtonsGroupConfig = EMPLOYERS_FILTER_BUTTONS_CONFIG;
    tableConfig: ITableConfigModel = EMPLOYERS_TABLE_CONFIG;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;

    private actionButtonsCallbacks: {
        [key: string]: (employer: IEmployer) => void;
    } = {
        [ActionType.DETAILS]: employer =>
            this.proceedToEmployerDetailsPage(employer),
        [ActionType.BLOCK]: employer =>
            this.changeEmployersStatus(
                employer,
                Status.BLOCKED,
                ActionType.BLOCK
            ),
        [ActionType.UNLOCK]: employer =>
            this.changeEmployersStatus(
                employer,
                Status.ACTIVE,
                ActionType.UNLOCK
            ),
    };

    constructor(
        public dataSource: BaseDataSource,
        private router: Router,
        private dialog: MatDialog,
        private employersService: EmployersService
    ) {
        super();
    }

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonsCallbacks[payload.type](
            payload.dataEntity as IEmployer
        );
    }

    private proceedToEmployerDetailsPage(employer: IEmployer): void {
        this.router.navigate(['/employers', employer.id, 'details']);
    }

    private changeEmployersStatus(
        employer: IEmployer,
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
                    this.employersService
                        .changeStatus(employer.id, status)
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

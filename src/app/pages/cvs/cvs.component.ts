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
import { CV } from '../../models/cv.model';
import { getDialogData } from '../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    CV_TAB_HEADER,
    CVS_FILTER_BUTTONS_CONFIG,
    CVS_SEARCH_INPUT_PLACEHOLDER,
    CVS_TABLE_CONFIG,
    STATUS_CHANGED_DIALOG_DATA,
} from './cv.constants';
import { CVsService } from './cvs.service';

@Component({
    selector: 'app-cv',
    templateUrl: './cvs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BaseDataSource],
})
export class CVsComponent extends SubscriberComponent {
    header = CV_TAB_HEADER;
    searchPlaceholder = CVS_SEARCH_INPUT_PLACEHOLDER;

    filterButtonsGroupConfig = CVS_FILTER_BUTTONS_CONFIG;
    tableConfig: ITableConfigModel = CVS_TABLE_CONFIG;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;

    private actionButtonsCallbacks: {
        [key: string]: (cv: CV) => void;
    } = {
        [ActionType.DETAILS]: x => this.proceedToCVDetailsPage(x),
        [ActionType.BLOCK]: x =>
            this.changeCVStatus(x, Status.BLOCKED, ActionType.BLOCK),
        [ActionType.UNLOCK]: x =>
            this.changeCVStatus(x, Status.ACTIVE, ActionType.UNLOCK),
        [ActionType.ACTIVATE]: x =>
            this.changeCVStatus(x, Status.ACTIVE, ActionType.ACTIVATE),
    };

    constructor(
        public dataSource: BaseDataSource,
        private router: Router,
        private dialog: MatDialog,
        private cvsService: CVsService
    ) {
        super();
    }

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonsCallbacks[payload.type](payload.dataEntity as CV);
    }

    private proceedToCVDetailsPage(cv: CV): void {
        this.router.navigate(['/cv', cv.id, 'details']);
    }

    private changeCVStatus(cv: CV, status: Status, action: ActionType): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(action, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this.updateStatus(cv.id, status);
                }
            });
    }

    private updateStatus(id: string, status: Status): void {
        this.cvsService
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

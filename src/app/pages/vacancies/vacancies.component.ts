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
import { IVacancyListItem } from '../../models';
import { getDialogData } from '../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    STATUS_CHANGED_DIALOG_DATA,
    VACANCIES_FILTER_BUTTONS_CONFIG,
    VACANCIES_SEARCH_INPUT_PLACEHOLDER,
    VACANCIES_TAB_HEADER,
    VACANCIES_TABLE_CONFIG,
} from './vacancies.constants';
import { VacanciesService } from './vacancies.service';

@Component({
    selector: 'app-vacancies',
    templateUrl: './vacancies.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BaseDataSource],
})
export class VacanciesComponent extends SubscriberComponent {
    header = VACANCIES_TAB_HEADER;
    searchPlaceholder = VACANCIES_SEARCH_INPUT_PLACEHOLDER;

    filterButtonsGroupConfig = VACANCIES_FILTER_BUTTONS_CONFIG;
    tableConfig: ITableConfigModel = VACANCIES_TABLE_CONFIG;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;

    private actionButtonsCallbacks: {
        [key: string]: (vacancy: IVacancyListItem) => void;
    } = {
        [ActionType.DETAILS]: x => this.proceedToVacancyDetailsPage(x),
        [ActionType.BLOCK]: x =>
            this.changeVacancyStatus(x, Status.BLOCKED, ActionType.BLOCK),
        [ActionType.UNLOCK]: x =>
            this.changeVacancyStatus(x, Status.ACTIVE, ActionType.UNLOCK),
        [ActionType.ACTIVATE]: x =>
            this.changeVacancyStatus(x, Status.ACTIVE, ActionType.ACTIVATE),
    };

    constructor(
        public dataSource: BaseDataSource,
        private router: Router,
        private dialog: MatDialog,
        private vacanciesService: VacanciesService
    ) {
        super();
    }

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonsCallbacks[payload.type](
            payload.dataEntity as IVacancyListItem
        );
    }

    private proceedToVacancyDetailsPage(vacancy: IVacancyListItem): void {
        this.router.navigate(['/vacancies', vacancy.id, 'details']);
    }

    private changeVacancyStatus(
        vacancy: IVacancyListItem,
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
                    this.updateStatus(vacancy.id, status);
                }
            });
    }

    private updateStatus(id: string, status: Status): void {
        this.vacanciesService
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

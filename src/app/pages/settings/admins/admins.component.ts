import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
    ADMINS_TAB_HEADER,
    ADMINS_TABLE_CONFIG,
    CONFIRMATION_DIALOG_BODY,
    INVALID_ID,
    REMOVE_ERROR_DIALOG_DATA,
    REMOVE_SUCCESS_DIALOG_DATA,
} from './admins.constants';
import { BaseDataSource } from '../../../core/datasource';
import { SubscriberComponent } from '../../../components/subscriber';
import {
    ActionButtonClickPayload,
    ActionType,
    ITableConfigModel,
} from '../../../components/table';
import { AdminListItem } from '../../../models';
import { AdminsService } from './admins.service';
import {
    ConfirmationDialogComponent,
    ConfirmationResult,
} from '../../../components/confirmation-dialog';
import { getDialogData } from '../../../utils';
import { takeUntil } from 'rxjs/operators';
import { InformDialogComponent } from '../../../components/inform-dialog';
import { MatDialog } from '@angular/material/dialog';
import { DataPanelComponent } from '../../../components/data-panel';
import { Router } from '@angular/router';
import { MODAL_DIALOG_COMMON_WIDTH } from '../../../constants';

@Component({
    selector: 'app-vacancies',
    templateUrl: './admins.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BaseDataSource],
})
export class AdminsComponent extends SubscriberComponent {
    header = ADMINS_TAB_HEADER;
    tableConfig: ITableConfigModel = ADMINS_TABLE_CONFIG;
    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;
    private actionButtonsCallbacks: {
        [key: string]: (employer: AdminListItem) => void;
    } = {
        [ActionType.EDIT]: admin =>
            this.router.navigate(['/settings/admins', admin.id, 'details']),
        [ActionType.REMOVE]: admin => this.removeAdmin(admin),
    };

    constructor(
        public dataSource: BaseDataSource,
        private adminsService: AdminsService,
        private dialog: MatDialog,
        private router: Router
    ) {
        super();
    }

    create() {
        this.router.navigate(['/settings/admins', INVALID_ID, 'details']);
    }

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonsCallbacks[payload.type](
            payload.dataEntity as AdminListItem
        );
    }

    removeAdmin(admin: AdminListItem) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(null, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this.adminsService.remove(admin.id).subscribe(
                        () => {
                            this.dialog.open(InformDialogComponent, {
                                width: MODAL_DIALOG_COMMON_WIDTH,
                                data: REMOVE_SUCCESS_DIALOG_DATA,
                            });
                            this.dataPanel.loadData(true);
                        },
                        () => {
                            this.dialog.open(InformDialogComponent, {
                                width: MODAL_DIALOG_COMMON_WIDTH,
                                data: REMOVE_ERROR_DIALOG_DATA,
                            });
                        }
                    );
                }
            });
    }
}

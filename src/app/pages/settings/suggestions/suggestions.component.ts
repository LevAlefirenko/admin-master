import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewChild,
} from '@angular/core';
import { BaseDataSource } from '../../../core/datasource';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
    ActionButtonClickPayload,
    ActionType,
    ITableConfigModel,
} from '../../../components/table';
import { DataPanelComponent } from '../../../components/data-panel';
import {
    CONFIRMATION_DIALOG_BODY,
    INVALID_ID,
    REMOVE_ERROR_DIALOG_DATA,
    REMOVE_SUCCESS_DIALOG_DATA,
    SUGGESTIONS_TAB_HEADER,
    SUGGESTIONS_TABLE_CONFIG,
} from './suggestions.constants';
import { SuggestionListItem } from '../../../models/suggestions.model';
import { SubscriberComponent } from '../../../components/subscriber';
import { take, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { SuggestionsService } from './suggestions.service';
import {
    ConfirmationDialogComponent,
    ConfirmationResult,
} from '../../../components/confirmation-dialog';
import { MODAL_DIALOG_COMMON_WIDTH } from '../../../constants';
import { getDialogData } from '../../../utils';
import { InformDialogComponent } from '../../../components/inform-dialog';

@Component({
    selector: 'app-suggestions',
    templateUrl: './suggestions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BaseDataSource],
})
export class SuggestionsComponent extends SubscriberComponent {
    tableConfig: ITableConfigModel = SUGGESTIONS_TABLE_CONFIG;
    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;
    header = SUGGESTIONS_TAB_HEADER;
    dataSource: MatTableDataSource<SuggestionListItem>;
    private actionButtonsCallbacks: {
        [key: string]: (suggestion: SuggestionListItem) => void;
    } = {
        [ActionType.EDIT]: suggestion =>
            this.router.navigate([
                '/settings/suggestions',
                suggestion.id,
                'details',
            ]),
        [ActionType.REMOVE]: suggestion => this._removeSuggestion(suggestion),
    };

    constructor(
        private dialog: MatDialog,
        private _suggestionsService: SuggestionsService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
        this.loadData();
    }

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonsCallbacks[payload.type](
            payload.dataEntity as SuggestionListItem
        );
    }

    create() {
        this.router.navigate(['/settings/suggestions', INVALID_ID, 'details']);
    }

    _removeSuggestion(suggestion: SuggestionListItem) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(null, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this._suggestionsService.remove(suggestion.id).subscribe(
                        () => {
                            this.dialog.open(InformDialogComponent, {
                                width: MODAL_DIALOG_COMMON_WIDTH,
                                data: REMOVE_SUCCESS_DIALOG_DATA,
                            });
                            this.loadData();
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

    private loadData(): void {
        this._suggestionsService
            .getData()
            .pipe(
                take(1),
                takeUntil(this.destroy$)
            )
            .subscribe((res: SuggestionListItem[]) => {
                this.dataSource = new MatTableDataSource<SuggestionListItem>(
                    res
                );
                this.changeDetectorRef.detectChanges();
            });
    }
}

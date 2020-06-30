import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import {
    ConfirmationDialogComponent,
    ConfirmationResult,
} from '../../../components/confirmation-dialog';
import { InformDialogComponent } from '../../../components/inform-dialog';
import { SubscriberComponent } from '../../../components/subscriber';
import { ACTION_TITLE, ActionType } from '../../../components/table';
import {
    ITEM_UPDATED_DIALOG_DATA,
    MODAL_DIALOG_COMMON_WIDTH,
    Status,
} from '../../../constants';
import { ExtendedPayableService, PayableServiceData } from '../../../models';
import { getDialogData } from '../../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    RETURN_TO_LIST_LINK,
    STATUS_CHANGED_DIALOG_DATA,
} from '../payable-services.constants';
import { PayableServicesService } from '../payable-services.service';

@Component({
    selector: 'app-payable-service-details',
    templateUrl: './payable-service-details.component.html',
    styleUrls: ['./payable-service-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayableServiceDetailsComponent extends SubscriberComponent
    implements OnInit {
    returnToListLink = RETURN_TO_LIST_LINK;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;
    private itemUpdatedDialogData = ITEM_UPDATED_DIALOG_DATA;
    private id: string;
    status = Status;
    action = ActionType;
    actionTitle = ACTION_TITLE;
    initialFormState: PayableServiceData;
    payableServiceItem: ExtendedPayableService;
    form: FormGroup;

    constructor(
        private payableServicesService: PayableServicesService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
        this._createForm();
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params.id;
        this.payableServicesService
            .getPayableService(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((payableService: ExtendedPayableService) => {
                this.payableServiceItem = payableService;
                this._updateForm();
                this.initialFormState = this._getFormValue();
                this.changeDetector.detectChanges();
            });
    }

    isBlocked() {
        return this.payableServiceItem.status === Status.BLOCKED;
    }

    get nameControl() {
        return this.form && this.form.get('name');
    }

    get descriptionControl() {
        return this.form && this.form.get('description');
    }

    get firstPeriodCostControl() {
        return this.form && this.form.get('firstPeriodCost');
    }

    get firstPeriodDaysControl() {
        return this.form && this.form.get('firstPeriodDays');
    }

    get secondPeriodCostControl() {
        return this.form && this.form.get('secondPeriodCost');
    }

    get secondPeriodDaysControl() {
        return this.form && this.form.get('secondPeriodDays');
    }

    get thirdPeriodDaysControl() {
        return this.form && this.form.get('thirdPeriodDays');
    }

    get thirdPeriodCostControl() {
        return this.form && this.form.get('thirdPeriodCost');
    }

    public isFormDisabled() {
        return !this.form.valid || !this._hasChanges();
    }

    public updatePayableServiceItem(): void {
        if (this.form.valid) {
            const payableServiceToSend = this._getFormValue();
            this.payableServicesService
                .updatePayableService(this.id, payableServiceToSend)
                .pipe(takeUntil(this.destroy$))
                .subscribe((payableService: ExtendedPayableService) => {
                    this.payableServiceItem = payableService;
                    this._updateForm();
                    this.changeDetector.detectChanges();
                    this.dialog.open(InformDialogComponent, {
                        width: MODAL_DIALOG_COMMON_WIDTH,
                        data: this.itemUpdatedDialogData,
                    });
                });
        }
    }

    public changePayableServiceStatus(
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
                        .changeStatus(this.payableServiceItem.id, status)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.payableServiceItem = {
                                ...this.payableServiceItem,
                                status,
                            };
                            this.changeDetector.detectChanges();
                            this.dialog.open(InformDialogComponent, {
                                width: MODAL_DIALOG_COMMON_WIDTH,
                                data: this.statusChangedDialogData,
                            });
                        });
                }
            });
    }

    private _createForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            firstPeriodDays: ['', [Validators.required, Validators.min(1)]],
            firstPeriodCost: ['', [Validators.required, Validators.min(1)]],
            secondPeriodDays: ['', [Validators.required, Validators.min(1)]],
            secondPeriodCost: ['', [Validators.required, Validators.min(1)]],
            thirdPeriodDays: ['', [Validators.required, Validators.min(1)]],
            thirdPeriodCost: ['', [Validators.required, Validators.min(1)]],
        });
    }

    private _updateForm(): void {
        this.form.patchValue({
            name: this.payableServiceItem.name,
            description: this.payableServiceItem.description,
            firstPeriodDays: this.payableServiceItem.firstPeriodDays,
            firstPeriodCost: this.payableServiceItem.firstPeriodCost,
            secondPeriodDays: this.payableServiceItem.secondPeriodDays,
            secondPeriodCost: this.payableServiceItem.secondPeriodCost,
            thirdPeriodDays: this.payableServiceItem.thirdPeriodDays,
            thirdPeriodCost: this.payableServiceItem.thirdPeriodCost,
        });
    }

    private _getFormValue(): PayableServiceData {
        return {
            name: this.nameControl.value,
            description: this.descriptionControl.value.trim(),
            firstPeriodDays: this.firstPeriodDaysControl.value,
            firstPeriodCost: this.firstPeriodCostControl.value,
            secondPeriodDays: this.secondPeriodDaysControl.value,
            secondPeriodCost: this.secondPeriodCostControl.value,
            thirdPeriodDays: this.thirdPeriodDaysControl.value,
            thirdPeriodCost: this.thirdPeriodCostControl.value,
        };
    }

    private _hasChanges(): boolean {
        return (
            JSON.stringify(this._getFormValue()) !==
            JSON.stringify(this.initialFormState)
        );
    }
}

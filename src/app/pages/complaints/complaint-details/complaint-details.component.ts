import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    ChangeDetectorRef,
} from '@angular/core';
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
    DATE_FORMAT,
    MODAL_DIALOG_COMMON_WIDTH,
    Status,
} from '../../../constants';
import { ExtendedComplaint } from '../../../models';
import { getDialogData, getOppositeStatus } from '../../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    RETURN_TO_LIST_LINK,
    STATUS_CHANGED_DIALOG_DATA,
} from '../complaints.constants';
import { ComplaintsService } from '../complaints.service';

@Component({
    selector: 'app-complaint-details',
    templateUrl: './complaint-details.component.html',
    styleUrls: ['./complaint-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplaintDetailsComponent extends SubscriberComponent
    implements OnInit {
    status = Status;
    action = ActionType;

    returnToListLink = RETURN_TO_LIST_LINK;
    actionTitle = ACTION_TITLE;

    dateFormat: string = DATE_FORMAT;
    private id: string;
    complaint: ExtendedComplaint;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private complaintsService: ComplaintsService,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.initData();
    }

    private initData(): void {
        this.id = this.route.snapshot.params.id;

        this.complaintsService
            .getComplaint(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((complaint: ExtendedComplaint) => {
                this.complaint = complaint;
                this.changeDetector.detectChanges();
            });
    }

    isArchived() {
        return this.complaint.status === Status.ARCHIVED;
    }

    private changeComplaintStatus(status: Status, action: ActionType): void {
        const _status = status || getOppositeStatus(this.complaint.status);
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(action, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this.updateStatus(this.complaint.id, _status);
                }
            });
    }

    private updateStatus(id: string, status: Status): void {
        this.complaintsService
            .changeStatus(id, status)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.complaint = {
                    ...this.complaint,
                    status,
                };
                this.changeDetector.detectChanges();
                this.dialog.open(InformDialogComponent, {
                    width: MODAL_DIALOG_COMMON_WIDTH,
                    data: this.statusChangedDialogData,
                });
            });
    }
}

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
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
import {
    CURRENCY_CODE,
    LONG_MONTH_DATE_FORMAT,
    MODAL_DIALOG_COMMON_WIDTH,
    Status,
} from '../../../constants';
import { Jobseeker } from '../../../models';
import { CV } from '../../../models/cv.model';
import { applyTemplate, getDialogData } from '../../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    GO_TO_CV_LINK,
    RETURN_TO_LIST_LINK,
    STATUS_CHANGED_DIALOG_DATA,
} from '../jobseekers.constants';
import { JobseekersService } from '../jobseekers.service';
import { forkJoin } from 'rxjs';
import { ACTION_TITLE, ActionType } from '../../../components/table';

@Component({
    selector: 'app-jobseeker-details',
    templateUrl: './jobseeker-details.component.html',
    styleUrls: ['./jobseeker-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobseekerDetailsComponent extends SubscriberComponent
    implements OnInit {
    status = Status;
    action = ActionType;
    actionTitle = ACTION_TITLE;
    returnToListLink = RETURN_TO_LIST_LINK;
    currencyCode = CURRENCY_CODE;
    longMonthDateFormat = LONG_MONTH_DATE_FORMAT;
    jobseeker: Jobseeker;
    cvs: CV[];

    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;
    private id: string;

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private jobSeekersService: JobseekersService,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.initData();
    }

    isBlocked() {
        return this.jobseeker.status === Status.BLOCKED;
    }

    private changeJobSeekerStatus(status: Status, action: ActionType): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(action, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this.jobSeekersService
                        .changeStatus(this.jobseeker.id, status)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.jobseeker = {
                                ...this.jobseeker,
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

    private initData(): void {
        this.id = this.route.snapshot.params.id;
        forkJoin(
            this.jobSeekersService.getJobseeker(this.id),
            this.jobSeekersService.getCVs(this.id)
        )
            .pipe(takeUntil(this.destroy$))
            .subscribe(([jobSeeker, cvs]: [Jobseeker, CV[]]) => {
                this.jobseeker = jobSeeker;
                this.cvs = cvs.map(cv => {
                    return {
                        ...cv,
                        href: applyTemplate(GO_TO_CV_LINK, { id: cv.id }),
                    };
                });
                this.changeDetector.detectChanges();
            });
    }
}

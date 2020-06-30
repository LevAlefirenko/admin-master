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
import { ACTION_TITLE, ActionType } from '../../../components/table';
import {
    CURRENCY_CODE,
    MODAL_DIALOG_COMMON_WIDTH,
    Status,
} from '../../../constants';
import { ExtendedCV } from '../../../models/cv.model';
import { getDialogData, getOppositeStatus } from '../../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    RETURN_TO_LIST_LINK,
    STATUS_CHANGED_DIALOG_DATA,
} from '../cv.constants';
import { CVsService } from '../cvs.service';

@Component({
    selector: 'app-cv-details',
    templateUrl: './cv-details.component.html',
    styleUrls: ['./cv-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVDetailsComponent extends SubscriberComponent implements OnInit {
    status = Status;
    action = ActionType;

    returnToListLink = RETURN_TO_LIST_LINK;
    actionTitle = ACTION_TITLE;

    private id: string;
    extendedCV: ExtendedCV;
    currencyCode = CURRENCY_CODE;
    jobSeekerAge: string;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private cvsService: CVsService,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.initData();
    }

    isAtModeration() {
        return this.extendedCV.cv.status === Status.MODERATION;
    }

    getAction() {
        return this.extendedCV.cv.status === Status.ACTIVE
            ? ActionType.BLOCK
            : ActionType.UNLOCK;
    }

    private initData(): void {
        this.id = this.route.snapshot.params.id;

        this.cvsService
            .getCV(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((extendedCV: ExtendedCV) => {
                this.extendedCV = extendedCV;
                this.jobSeekerAge = this.getAgeString(
                    this.extendedCV.jobseeker.birthDate
                );
                this.changeDetector.detectChanges();
            });
    }

    private changeCvStatus(status: Status, action: ActionType): void {
        const _status = status || getOppositeStatus(this.extendedCV.cv.status);
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(action, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this.updateStatus(this.extendedCV.cv.id, _status);
                }
            });
    }

    private updateStatus(id: string, status: Status): void {
        this.cvsService
            .changeStatus(id, status)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.extendedCV = {
                    ...this.extendedCV,
                    cv: {
                        ...this.extendedCV.cv,
                        status: status,
                    },
                };
                this.changeDetector.detectChanges();
                this.dialog.open(InformDialogComponent, {
                    width: MODAL_DIALOG_COMMON_WIDTH,
                    data: this.statusChangedDialogData,
                });
            });
    }

    private getCurrentAge(birthDateString: string): number {
        const today = new Date();
        const birthDate = new Date(birthDateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    private getAgeString(birthDateString: string): string {
        const age = this.getCurrentAge(birthDateString);
        let yearsString = '';
        let count = age % 100;
        if (count >= 5 && count <= 20) {
            yearsString = 'лет';
        } else {
            count = count % 10;
            if (count == 1) {
                yearsString = 'год';
            } else if (count >= 2 && count <= 4) {
                yearsString = 'года';
            } else {
                yearsString = 'лет';
            }
        }
        return `${age} ${yearsString}`;
    }
}

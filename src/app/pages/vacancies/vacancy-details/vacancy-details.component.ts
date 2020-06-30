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
    MODAL_DIALOG_COMMON_WIDTH,
    Status,
} from '../../../constants';
import { IVacancyData } from '../../../models';
import {
    applyTemplate,
    getDialogData,
    getOppositeStatus,
} from '../../../utils';
import {
    CONFIRMATION_DIALOG_BODY,
    GO_TO_EMPLOYER_LINK,
    RETURN_TO_LIST_LINK,
    STATUS_CHANGED_DIALOG_DATA,
} from '../vacancies.constants';
import { VacanciesService } from '../vacancies.service';
import { ACTION_TITLE, ActionType } from '../../../components/table';

@Component({
    selector: 'app-vacancy-details',
    templateUrl: './vacancy-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./vacancy-details.component.scss'],
})
export class VacancyDetailsComponent extends SubscriberComponent
    implements OnInit {
    status = Status;
    action = ActionType;

    returnToListLink = RETURN_TO_LIST_LINK;
    actionTitle = ACTION_TITLE;

    private id: string;
    vacancyData: IVacancyData;
    currencyCode = CURRENCY_CODE;
    goToEmployerLink: string;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private vacanciesService: VacanciesService,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.initData();
    }

    isAtModeration() {
        return this.vacancyData.vacancy.status === Status.MODERATION;
    }

    getAction() {
        return this.vacancyData.vacancy.status === Status.ACTIVE
            ? ActionType.BLOCK
            : ActionType.UNLOCK;
    }
    private initData(): void {
        this.id = this.route.snapshot.params.id;

        this.vacanciesService
            .getVacancy(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((vacancyData: IVacancyData) => {
                this.vacancyData = vacancyData;
                this.goToEmployerLink = applyTemplate(GO_TO_EMPLOYER_LINK, {
                    id: this.vacancyData.employer.id,
                });
                this.changeDetector.detectChanges();
            });
    }

    private changeVacancyStatus(status: Status, action: ActionType): void {
        const _status =
            status || getOppositeStatus(this.vacancyData.vacancy.status);
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(action, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this.updateStatus(this.vacancyData.vacancy.id, _status);
                }
            });
    }

    private updateStatus(id: string, status: Status): void {
        this.vacanciesService
            .changeStatus(id, status)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.vacancyData = {
                    ...this.vacancyData,
                    vacancy: {
                        ...this.vacancyData.vacancy,
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
}

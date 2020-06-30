import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SubscriberComponent } from '../../../components/subscriber';
import { IEmployer, IEmployerVacancy, IVacancy } from '../../../models';
import {
    CONFIRMATION_DIALOG_BODY,
    GO_TO_VACANCY_LINK,
    RETURN_TO_LIST_LINK,
    STATUS_CHANGED_DIALOG_DATA,
} from '../employers.constants';
import { EmployersService } from '../employers.service';
import {
    CURRENCY_CODE,
    LONG_MONTH_DATE_FORMAT,
    DATE_FORMAT,
    Status,
    MODAL_DIALOG_COMMON_WIDTH,
} from '../../../constants';
import {
    ConfirmationDialogComponent,
    ConfirmationResult,
} from '../../../components/confirmation-dialog';
import { takeUntil } from 'rxjs/operators';
import { InformDialogComponent } from '../../../components/inform-dialog';
import { applyTemplate, getDialogData } from '../../../utils';
import { MatDialog } from '@angular/material';
import { ACTION_TITLE, ActionType } from '../../../components/table';

@Component({
    selector: 'app-employer-details',
    templateUrl: './employer-details.component.html',
    styleUrls: ['./employer-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployerDetailsComponent extends SubscriberComponent
    implements OnInit {
    status = Status;
    action = ActionType;
    actionTitle = ACTION_TITLE;

    returnToListLink = RETURN_TO_LIST_LINK;
    currencyCode = CURRENCY_CODE;
    longMonthDateFormat = LONG_MONTH_DATE_FORMAT;
    dateFormat: string = DATE_FORMAT;
    private statusChangedDialogData = STATUS_CHANGED_DIALOG_DATA;
    private id: string;
    employer: IEmployer;
    private vacancies: IEmployerVacancy[];

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private employersService: EmployersService,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit() {
        this.initData();
    }

    isBlocked() {
        return this.employer.status === Status.BLOCKED;
    }

    private changeEmployerStatus(status: Status, action: ActionType): void {
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
                        .changeStatus(this.employer.id, status)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.employer = {
                                ...this.employer,
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
            this.employersService.getEmployer(this.id),
            this.employersService.getEmployerVacancies(this.id)
        )
            .pipe(takeUntil(this.destroy$))
            .subscribe(([employer, vacancies]: [IEmployer, IVacancy[]]) => {
                this.employer = employer;
                this.vacancies = vacancies.map((vacancy: IVacancy) => {
                    return {
                        ...vacancy,
                        href: applyTemplate(GO_TO_VACANCY_LINK, {
                            id: vacancy.id,
                        }),
                    };
                });

                this.changeDetector.detectChanges();
            });
    }
}

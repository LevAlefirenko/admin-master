import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Suggestion } from '../../../../models/suggestions.model';
import { SuggestionUpdateRequest } from '../suggestions.interfaces';
import { AppService } from '../../../../core/app/app.service';
import { SubscriberComponent } from '../../../../components/subscriber';
import { SuggestionsService } from '../suggestions.service';

import { InformDialogComponent } from '../../../../components/inform-dialog';
import {
    CREATE_ERROR_DIALOG_DATA,
    CREATE_SUCCESS_DIALOG_DATA,
    SuggestionFormState,
    UPDATE_ERROR_DIALOG_DATA,
    UPDATE_SUCCESS_DIALOG_DATA,
} from './suggestion-details.constants';
import {
    CONFIRMATION_DIALOG_BODY,
    INVALID_ID,
    REMOVE_ERROR_DIALOG_DATA,
    RETURN_TO_LIST_LINK,
    SUGGESTION_FETCHING,
} from '../suggestions.constants';
import {
    ConfirmationDialogComponent,
    ConfirmationResult,
} from '../../../../components/confirmation-dialog';
import { MODAL_DIALOG_COMMON_WIDTH } from '../../../../constants';
import { getDialogData } from '../../../../utils';
import { REMOVE_SUCCESS_DIALOG_DATA } from '../../admins/admins.constants';

@Component({
    selector: 'app-payable-service-details',
    templateUrl: './suggestion-details.component.html',
    styleUrls: ['./suggestion-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionDetailsComponent extends SubscriberComponent
    implements OnInit {
    returnToListLink = RETURN_TO_LIST_LINK;
    form: FormGroup;
    loading: boolean;
    formState = SuggestionFormState.Edit;
    initialFormState: SuggestionUpdateRequest;
    suggestion: Suggestion = null;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private _app: AppService,
        private _suggestionsService: SuggestionsService,
        private _detectorRef: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        const id = Number(this._route.snapshot.paramMap.get('id'));
        if (id === INVALID_ID) {
            this.formState = SuggestionFormState.Create;
        }
        if (this.isEditMode()) {
            this._app
                .isLoading$(SUGGESTION_FETCHING)
                .pipe(takeUntil(this.destroy$))
                .subscribe(x => {
                    this.loading = x;
                    this._detectorRef.detectChanges();
                });

            this._suggestionsService
                .getSuggestion(id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data: Suggestion) => {
                    this.suggestion = data;
                    this._createForm();
                    this.initialFormState = this._getFormData();
                    this._detectorRef.detectChanges();
                });
        } else {
            this._createForm();
            this.initialFormState = this._getFormData();
            this._detectorRef.detectChanges();
        }
    }

    private _getFormData(): SuggestionUpdateRequest {
        return this.form.value;
    }

    private _hasChanges(): boolean {
        return (
            JSON.stringify(this._getFormData()) !==
            JSON.stringify(this.initialFormState)
        );
    }

    private _createForm() {
        this.form = this.fb.group({
            title: [
                this.formState === SuggestionFormState.Create
                    ? ''
                    : this.suggestion.title,
                [Validators.required],
            ],
        });
    }

    get titleControl() {
        return this.form && this.form.get('title');
    }

    private _updateForm(suggestion: Suggestion) {
        this.form.patchValue({ title: suggestion.title });
    }

    isEditMode() {
        return this.formState === SuggestionFormState.Edit;
    }

    saveOrUpdate() {
        this._validateAllFormFields(this.form);
        if (this.form.valid && this._hasChanges()) {
            if (!this.isEditMode()) {
                this._create();
            } else {
                this._update();
            }
        }
    }

    private _validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this._validateAllFormFields(control);
            }
        });
    }

    private _create() {
        this._suggestionsService.create(this._getFormData()).subscribe(
            (suggestion: Suggestion) => {
                this.suggestion = suggestion;
                this._updateForm(suggestion);
                this.formState = SuggestionFormState.Edit;
                this._detectorRef.detectChanges();
                this._router.navigate(
                    ['/settings/suggestions', suggestion.id, 'details'],
                    {
                        replaceUrl: true,
                    }
                );
                this.dialog.open(InformDialogComponent, {
                    width: MODAL_DIALOG_COMMON_WIDTH,
                    data: CREATE_SUCCESS_DIALOG_DATA,
                });
            },
            () => {
                this.dialog.open(InformDialogComponent, {
                    width: MODAL_DIALOG_COMMON_WIDTH,
                    data: CREATE_ERROR_DIALOG_DATA,
                });
            }
        );
    }

    private _update() {
        this._suggestionsService
            .update(this.suggestion.id, this._getFormData())
            .subscribe(
                (suggestion: Suggestion) => {
                    this.suggestion = suggestion;
                    this._updateForm(suggestion);
                    this.formState = SuggestionFormState.Edit;
                    this._detectorRef.detectChanges();
                    this.dialog.open(InformDialogComponent, {
                        width: MODAL_DIALOG_COMMON_WIDTH,
                        data: UPDATE_SUCCESS_DIALOG_DATA,
                    });
                },
                () => {
                    this.dialog.open(InformDialogComponent, {
                        width: MODAL_DIALOG_COMMON_WIDTH,
                        data: UPDATE_ERROR_DIALOG_DATA,
                    });
                }
            );
    }

    remove() {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: MODAL_DIALOG_COMMON_WIDTH,
            data: getDialogData(null, CONFIRMATION_DIALOG_BODY),
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: ConfirmationResult) => {
                if (result === ConfirmationResult.CONFIRM) {
                    this._suggestionsService
                        .remove(this.suggestion.id)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(
                            () => {
                                const informDialogRef = this.dialog.open(
                                    InformDialogComponent,
                                    {
                                        width: MODAL_DIALOG_COMMON_WIDTH,
                                        data: REMOVE_SUCCESS_DIALOG_DATA,
                                    }
                                );

                                informDialogRef.afterClosed().subscribe(() => {
                                    this._router.navigate([
                                        this.returnToListLink.route,
                                    ]);
                                });
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

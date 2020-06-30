import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    ADMIN_FETCHING,
    CONFIRMATION_DIALOG_BODY,
    INVALID_ID,
    REMOVE_ERROR_DIALOG_DATA,
    REMOVE_SUCCESS_DIALOG_DATA,
    RETURN_TO_LIST_LINK,
} from '../admins.constants';
import { AdminsService } from '../admins.service';
import { AppService } from '../../../../core/app/app.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ErrorHandlerComponent } from '../../../../error-handler/error-handler.component';
import { MODAL_DIALOG_COMMON_WIDTH } from '../../../../constants';
import { takeUntil } from 'rxjs/operators';
import { Admin } from '../../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AdminUpdateRequest,
    Permission,
    PERMISSIONS_SECTION_TITLES,
    PERMISSIONS_TITLES,
    PERMISSTIONS_SECTION,
} from '../admins.interfaces';
import {
    ConfirmationDialogComponent,
    ConfirmationResult,
} from '../../../../components/confirmation-dialog';
import { InformDialogComponent } from '../../../../components/inform-dialog';
import { MatDialog } from '@angular/material/dialog';
import {
    AdminFormState,
    CREATE_ERROR_DIALOG_DATA,
    CREATE_SUCCESS_DIALOG_DATA,
    UPDATE_ERROR_DIALOG_DATA,
    UPDATE_SUCCESS_DIALOG_DATA,
} from './admin-details.constants';
import { getDialogData } from '../../../../utils';
import { AdminService } from '../../../../admin/admin.service';

@Component({
    selector: 'app-admin-details',
    templateUrl: './admin-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./admin-details.component.scss'],
})
export class AdminDetailsComponent extends ErrorHandlerComponent
    implements OnInit {
    returnToListLink = RETURN_TO_LIST_LINK;
    form: FormGroup;
    loading: boolean;
    formState = AdminFormState.Edit;
    initialFormState: AdminUpdateRequest;
    admin: Admin = null;
    permissionSections = PERMISSTIONS_SECTION;
    permissionSectionsValues = Object.values(this.permissionSections);
    permissionSectionTitles = PERMISSIONS_SECTION_TITLES;
    permissions = Permission;
    permissionsTitles = PERMISSIONS_TITLES;

    constructor(
        private _adminsService: AdminsService,
        private _app: AppService,
        private fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private dialog: MatDialog,
        private _detectorRef: ChangeDetectorRef,
        private _adminService: AdminService
    ) {
        super();
    }

    ngOnInit(): void {
        const id = Number(this._route.snapshot.paramMap.get('id'));
        if (id === INVALID_ID) {
            this.formState = AdminFormState.Create;
        }
        if (this.isEditMode()) {
            this._app
                .isLoading$(ADMIN_FETCHING)
                .pipe(takeUntil(this.destroy$))
                .subscribe(x => {
                    this.loading = x;
                    this._detectorRef.detectChanges();
                });

            this._adminsService
                .getAdmin(id)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data: Admin) => {
                    this.admin = data;
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

    get login() {
        return this.form && this.form.get('login');
    }

    get password() {
        return this.form && this.form.get('password');
    }

    get confirmPassword() {
        return this.form && this.form.get('confirmPassword');
    }

    get permissionsGroup() {
        return this.form && this.form.get('permissions');
    }

    getPermissionControl(sectionKey) {
        return this.permissionsGroup && this.permissionsGroup.get(sectionKey);
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
                    this._adminsService
                        .remove(this.admin.id)
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

    private _createForm() {
        this.form = this.fb.group({
            login: [
                this.formState === AdminFormState.Create
                    ? ''
                    : this.admin.login,
                [Validators.required, Validators.minLength(5)],
            ],
            password: [
                '',
                [this._passwordValidator.bind(this), Validators.minLength(10)],
            ],
            confirmPassword: ['', [this._validateAreEqual.bind(this)]],
            permissions: this._createPermissionControls(),
        });

        this._subscribeOnPasswordChanges();
    }

    private _passwordValidator(fieldControl: FormControl) {
        if (!this.isEditMode()) {
            return Validators.required(fieldControl);
        }
        return null;
    }

    private _validateAreEqual(fieldControl: FormControl) {
        if (this.form) {
            return this.confirmPassword.value === this.password.value
                ? null
                : {
                      notEqual: true,
                  };
        }
    }

    private _subscribeOnPasswordChanges() {
        this.password.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.confirmPassword.updateValueAndValidity();
            });
    }

    private _createPermissionControls() {
        return Object.keys(this.permissionSections).reduce((acc, key) => {
            acc.addControl(
                this.permissionSections[key],
                this.fb.control(
                    this.isEditMode()
                        ? this.admin.permissions[
                              this.permissionSections[key]
                          ] || ''
                        : ''
                )
            );
            return acc;
        }, this.fb.group({}));
    }

    isEditMode() {
        return this.formState === AdminFormState.Edit;
    }

    private _getFormData(): AdminUpdateRequest {
        const { login, password, permissions } = this.form.value;
        const requestData: any = { login, permissions };
        if (password !== '') {
            requestData.password = password;
        }
        return requestData;
    }

    private _hasChanges(): boolean {
        return (
            JSON.stringify(this._getFormData()) !==
            JSON.stringify(this.initialFormState)
        );
    }

    private _updateForm(admin: Admin) {
        this.password.reset('');
        this.confirmPassword.reset('');

        this.login.patchValue(admin.login);

        this._updatePermissionsForm(admin);
    }

    private _updatePermissionsForm(admin: Admin) {
        this.permissionSectionsValues.forEach(sectionKey => {
            this.getPermissionControl(sectionKey).patchValue(
                admin.permissions[sectionKey] || ''
            );
        });
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
        this._adminsService.create(this._getFormData()).subscribe(
            (admin: Admin) => {
                this.admin = admin;
                this.formState = AdminFormState.Edit;
                this._updateForm(admin);
                this._detectorRef.detectChanges();
                this._router.navigate(
                    ['/settings/admins', admin.id, 'details'],
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
        this._adminsService
            .update(this.admin.id, this._getFormData())
            .subscribe(
                (admin: Admin) => {
                    const currentAdmin = this._adminService.getCurrent();
                    if (currentAdmin.id === admin.id) {
                        this._adminService.updateCurrent(admin);
                    }
                    this.admin = admin;
                    this._updateForm(admin);
                    this.formState = AdminFormState.Edit;
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
}

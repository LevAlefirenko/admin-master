import { finalize, takeUntil } from 'rxjs/operators';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { LoginRequest, LoginResponse } from '../../core/auth/auth.interfaces';
import { AdminService } from '../../admin/admin.service';
import { AppService } from '../../core/app/app.service';
import { LOGIN_ERROR_MESSAGE, LOGIN_FETCH } from './login.constants';
import { SubscriberComponent } from '../../components/subscriber';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends SubscriberComponent implements OnInit {
    form: FormGroup;
    loading: boolean;
    errors: any[] = [];

    constructor(
        private _authService: AuthService,
        private _adminService: AdminService,
        private _router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private _detectorRef: ChangeDetectorRef,
        private _appService: AppService
    ) {
        super();
        this._createForm();
    }

    get email() {
        return this.form && this.form.get('email');
    }

    get password() {
        return this.form && this.form.get('password');
    }

    public ngOnInit() {
        this._appService
            .isLoading$(LOGIN_FETCH)
            .pipe(takeUntil(this.destroy$))
            .subscribe(x => {
                this.loading = x;
                this._detectorRef.detectChanges();
            });
    }

    public authorize() {
        if (this.form.valid && !this.loading) {
            const loginRequest: LoginRequest = {
                login: this.form.value.email,
                password: this.form.value.password,
            };

            this._appService.startLoading(LOGIN_FETCH);
            this._authService
                .authorize(loginRequest)
                .pipe(
                    takeUntil(this.destroy$),
                    finalize(() => {
                        this._appService.finishLoading(LOGIN_FETCH);
                    })
                )
                .subscribe(
                    ({
                        refresh: refreshToken,
                        token: authToken,
                    }: LoginResponse) => {
                        this._authService.storeTokens({
                            refreshToken,
                            authToken,
                        });
                        this._adminService.fetchCurrent();
                        const returnUrl = this.route.snapshot.queryParams[
                            'returnUrl'
                        ];
                        this._router.navigate([returnUrl || '/']);
                    },
                    err => {
                        this.errors = [{ message: LOGIN_ERROR_MESSAGE }];
                        this._detectorRef.detectChanges();
                    }
                );
        }
    }

    private _createForm() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, Validators.minLength(10)]],
        });
    }
}

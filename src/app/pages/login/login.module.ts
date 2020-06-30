import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabModule } from '../../components/tab';

import { LoginComponent } from './login.component';
import { loginRoutes } from './login.routes';
import { MaterialModule } from '../../../common/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { BubbleErrorModule } from '../../components/bubble-error';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        BubbleErrorModule,
        RouterModule.forChild(loginRoutes),
        TabModule,
    ],
})
export class LoginModule {}

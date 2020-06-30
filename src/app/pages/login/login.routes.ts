import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginGuard } from '../../guards/login.guard';

export const loginRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [LoginGuard],
    },
];

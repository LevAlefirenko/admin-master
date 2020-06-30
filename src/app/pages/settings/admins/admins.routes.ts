import { Routes } from '@angular/router';

import { AdminsComponent } from './admins.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';

export const adminsRoutes: Routes = [
    {
        path: '',
        component: AdminsComponent,
    },
    {
        path: ':id/details',
        component: AdminDetailsComponent,
    },
];

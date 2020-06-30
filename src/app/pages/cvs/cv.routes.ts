import { Routes } from '@angular/router';

import { CVDetailsComponent } from './cv-details/cv-details.component';
import { CVsComponent } from './cvs.component';

export const cvRoutes: Routes = [
    {
        path: '',
        component: CVsComponent,
    },
    {
        path: ':id/details',
        component: CVDetailsComponent,
    },
];

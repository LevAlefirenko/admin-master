import { Routes } from '@angular/router';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { EmployersComponent } from './employers.component';

export const employersRoutes: Routes = [
    {
        path: '',
        component: EmployersComponent,
    },
    {
        path: ':id/details',
        component: EmployerDetailsComponent,
    },
];

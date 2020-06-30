import { Routes } from '@angular/router';
import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';
import { ComplaintsComponent } from './complaints.component';

export const complaintsRoutes: Routes = [
    {
        path: '',
        component: ComplaintsComponent,
    },
    {
        path: ':id/details',
        component: ComplaintDetailsComponent,
    },
];

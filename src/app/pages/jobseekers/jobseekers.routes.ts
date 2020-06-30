import { Routes } from '@angular/router';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { JobseekersComponent } from './jobseekers.component';

export const jobseekersRoutes: Routes = [
    {
        path: '',
        component: JobseekersComponent,
    },
    {
        path: ':id/details',
        component: JobseekerDetailsComponent,
    },
];

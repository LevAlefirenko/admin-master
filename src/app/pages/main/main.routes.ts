import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../../guards/auth.guard';

export const mainRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: MainComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'employers',
            },
            {
                path: 'employers',
                loadChildren: () =>
                    import('../employers/employers.module').then(
                        m => m.EmployersModule
                    ),
            },
            {
                path: 'jobseekers',
                loadChildren: () =>
                    import('../jobseekers/jobseekers.module').then(
                        m => m.JobseekersModule
                    ),
            },
            {
                path: 'vacancies',
                loadChildren: () =>
                    import('../vacancies/vacancies.module').then(
                        m => m.VacanciesModule
                    ),
            },
            {
                path: 'cv',
                loadChildren: () =>
                    import('../cvs/cv.module').then(m => m.CVModule),
            },
            {
                path: 'payable-services',
                loadChildren: () =>
                    import('../payable-services/payable-services.module').then(
                        m => m.PayableServicesModule
                    ),
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('../settings/settings.module').then(
                        m => m.SettingsModule
                    ),
            },
            {
                path: 'complaints',
                loadChildren: () =>
                    import('../complaints/complaints.module').then(
                        m => m.ComplaintsModule
                    ),
            },
            {
                path: 'purchases',
                loadChildren: () =>
                    import('../purchases/purchases.module').then(
                        m => m.PurchasesModule
                    ),
            },
        ],
    },
];

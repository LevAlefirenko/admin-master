import { Routes } from '@angular/router';

import { VacanciesComponent } from './vacancies.component';
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';

export const vacanciesRoutes: Routes = [
    {
        path: '',
        component: VacanciesComponent,
    },
    {
        path: ':id/details',
        component: VacancyDetailsComponent,
    },
];

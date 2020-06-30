import { Routes } from '@angular/router';

import { PayableServiceDetailsComponent } from './payable-service-details/payable-service-details.component';
import { PayableServicesComponent } from './payable-services.component';

export const payableServicesRoutes: Routes = [
    {
        path: '',
        component: PayableServicesComponent,
    },
    {
        path: ':id/details',
        component: PayableServiceDetailsComponent,
    },
];

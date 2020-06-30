import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../common/material';
import { ConfirmationDialogModule } from '../../components/confirmation-dialog';
import { DataPanelModule } from '../../components/data-panel';
import { InformDialogModule } from '../../components/inform-dialog';
import { TabModule } from '../../components/tab';
import { SharedModule } from '../../shared';

import { PayableServiceDetailsComponent } from './payable-service-details/payable-service-details.component';
import { PayableServicesComponent } from './payable-services.component';
import { payableServicesRoutes } from './payable-services.routes';
import { PayableServicesService } from './payable-services.service';

@NgModule({
    declarations: [PayableServicesComponent, PayableServiceDetailsComponent],
    imports: [
        CommonModule,
        ConfirmationDialogModule,
        InformDialogModule,
        RouterModule.forChild(payableServicesRoutes),
        TabModule,
        SharedModule,
        MaterialModule,
        DataPanelModule,
        ReactiveFormsModule,
    ],
    providers: [PayableServicesService],
})
export class PayableServicesModule {}

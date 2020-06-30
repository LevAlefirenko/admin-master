import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../common/material';
import { ConfirmationDialogModule } from '../../components/confirmation-dialog';
import { DataPanelModule } from '../../components/data-panel';
import { InformDialogModule } from '../../components/inform-dialog';
import { TabModule } from '../../components/tab';
import { DataService } from '../../models';
import { SharedModule } from '../../shared';

import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';
import { ComplaintsComponent } from './complaints.component';
import { ComplaintsDataService } from './complaints.data.service';
import { complaintsRoutes } from './complaints.routes';
import { ComplaintsService } from './complaints.service';

@NgModule({
    declarations: [ComplaintsComponent, ComplaintDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(complaintsRoutes),
        TabModule,
        InformDialogModule,
        SharedModule,
        DataPanelModule,
        ConfirmationDialogModule,
        MaterialModule,
    ],
    providers: [
        ComplaintsService,
        { provide: DataService, useClass: ComplaintsDataService },
    ],
})
export class ComplaintsModule {}

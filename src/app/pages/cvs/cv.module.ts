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

import { CVDetailsComponent } from './cv-details/cv-details.component';
import { CVsDataService } from './cv.data.service';
import { cvRoutes } from './cv.routes';
import { CVsComponent } from './cvs.component';
import { CVsService } from './cvs.service';

@NgModule({
    declarations: [CVsComponent, CVDetailsComponent],
    imports: [
        CommonModule,
        ConfirmationDialogModule,
        MaterialModule,
        RouterModule.forChild(cvRoutes),
        TabModule,
        InformDialogModule,
        SharedModule,
        DataPanelModule,
    ],
    providers: [CVsService, { provide: DataService, useClass: CVsDataService }],
})
export class CVModule {}

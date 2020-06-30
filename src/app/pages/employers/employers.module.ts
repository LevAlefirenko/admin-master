import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataPanelModule } from '../../components/data-panel';
import { TabModule } from '../../components/tab';
import { DataService } from '../../models';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { EmployersComponent } from './employers.component';
import { employersRoutes } from './employers.routes';
import { MaterialModule } from '../../../common/material';
import { SharedModule } from '../../shared';
import { ConfirmationDialogModule } from '../../components/confirmation-dialog';
import { InformDialogModule } from '../../components/inform-dialog';
import { EmployersDataService } from './employers.data.service';
import { EmployersService } from './employers.service';

@NgModule({
    declarations: [EmployersComponent, EmployerDetailsComponent],
    imports: [
        CommonModule,
        ConfirmationDialogModule,
        InformDialogModule,
        RouterModule.forChild(employersRoutes),
        TabModule,
        SharedModule,
        MaterialModule,
        DataPanelModule,
    ],
    providers: [
        EmployersService,
        { provide: DataService, useClass: EmployersDataService },
    ],
})
export class EmployersModule {}

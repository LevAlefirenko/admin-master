import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataPanelModule } from '../../../components/data-panel';
import { TabModule } from '../../../components/tab';
import { DataService } from '../../../models';
import { MaterialModule } from '../../../../common/material';
import { SharedModule } from '../../../shared';
import { ConfirmationDialogModule } from '../../../components/confirmation-dialog';
import { InformDialogModule } from '../../../components/inform-dialog';
import { AdminsDataService } from './admins.data.service';
import { AdminsService } from './admins.service';
import { AdminsComponent } from './admins.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { adminsRoutes } from './admins.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    declarations: [AdminsComponent, AdminDetailsComponent],
    imports: [
        CommonModule,
        ConfirmationDialogModule,
        InformDialogModule,
        RouterModule.forChild(adminsRoutes),
        TabModule,
        SharedModule,
        MaterialModule,
        DataPanelModule,
        ReactiveFormsModule,
        MatRadioModule,
    ],
    providers: [
        AdminsService,
        { provide: DataService, useClass: AdminsDataService },
    ],
})
export class AdminsModule {}

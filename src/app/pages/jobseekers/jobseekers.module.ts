import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogModule } from '../../components/confirmation-dialog';
import { DataPanelModule } from '../../components/data-panel';
import { InformDialogModule } from '../../components/inform-dialog';
import { TabModule } from '../../components/tab';
import { DataService } from '../../models';
import { SharedModule } from '../../shared';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { JobseekersComponent } from './jobseekers.component';
import { jobseekersRoutes } from './jobseekers.routes';
import { JobseekersService } from './jobseekers.service';
import { MaterialModule } from '../../../common/material';
import { JobseekersDataService } from './jobseekers.data.service';

@NgModule({
    declarations: [JobseekersComponent, JobseekerDetailsComponent],
    imports: [
        CommonModule,
        ConfirmationDialogModule,
        InformDialogModule,
        SharedModule,
        RouterModule.forChild(jobseekersRoutes),
        TabModule,
        MaterialModule,
        DataPanelModule,
    ],
    providers: [
        JobseekersService,
        { provide: DataService, useClass: JobseekersDataService },
    ],
})
export class JobseekersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogModule } from '../../components/confirmation-dialog';
import { DataPanelModule } from '../../components/data-panel';
import { InformDialogModule } from '../../components/inform-dialog';
import { TabModule } from '../../components/tab';
import { SharedModule } from '../../shared';

import { VacanciesComponent } from './vacancies.component';
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';
import { vacanciesRoutes } from './vacancies.routes';
import { MaterialModule } from '../../../common/material';
import { DataService } from '../../models';
import { VacanciesService } from './vacancies.service';
import { VacanciesDataService } from './vacancies.data.service';

@NgModule({
    declarations: [VacanciesComponent, VacancyDetailsComponent],
    imports: [
        CommonModule,
        ConfirmationDialogModule,
        InformDialogModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(vacanciesRoutes),
        TabModule,
        DataPanelModule,
    ],
    providers: [
        VacanciesService,
        { provide: DataService, useClass: VacanciesDataService },
    ],
})
export class VacanciesModule {}

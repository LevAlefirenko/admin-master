import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../common/material';
import { DataPanelModule } from '../../components/data-panel';
import { TabModule } from '../../components/tab';
import { DataService, DropdownDataService } from '../../models';
import { SharedModule } from '../../shared';
import { PurchasesComponent } from './purchases.component';
import { PurchasesDataService } from './purchases.data.service';
import { PurchasesDropdownDataService } from './purchases.dropdown-data.service';
import { purchasesRoutes } from './purchases.routes';

@NgModule({
    declarations: [PurchasesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(purchasesRoutes),
        SharedModule,
        TabModule,
        MaterialModule,
        DataPanelModule,
    ],
    providers: [
        { provide: DataService, useClass: PurchasesDataService },
        {
            provide: DropdownDataService,
            useClass: PurchasesDropdownDataService,
        },
    ],
})
export class PurchasesModule {}

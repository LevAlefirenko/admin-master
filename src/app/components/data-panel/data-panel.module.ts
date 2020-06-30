import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../common/material';
import { SharedModule } from '../../shared';
import { FilterButtonsGroupModule } from '../filter-buttons-group';
import { PaginatorModule } from '../paginator';
import { TabModule } from '../tab';
import { TableModule } from '../table';
import { DataPanelComponent } from './data-panel.component';

@NgModule({
    declarations: [DataPanelComponent],
    exports: [DataPanelComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        TabModule,
        TableModule,
        PaginatorModule,
        FilterButtonsGroupModule,
    ],
})
export class DataPanelModule {}

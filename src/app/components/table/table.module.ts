import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../common/material';
import { SharedModule } from '../../shared';
import { TableComponent } from './table.component';
import { ActionButtonComponent } from './action-button/action-button.component';

@NgModule({
    declarations: [TableComponent, ActionButtonComponent],
    imports: [CommonModule, MaterialModule, SharedModule, RouterModule],
    exports: [TableComponent],
})
export class TableModule {}

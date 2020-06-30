import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterButtonsGroupComponent } from './filter-buttons-group.component';
import { MaterialModule } from '../../../common/material';

@NgModule({
    declarations: [FilterButtonsGroupComponent],
    imports: [CommonModule, MaterialModule],
    exports: [FilterButtonsGroupComponent],
})
export class FilterButtonsGroupModule {}

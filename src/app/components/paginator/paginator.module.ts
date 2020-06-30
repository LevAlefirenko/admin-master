import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../common/material';
import { PaginatorComponent } from './paginator.component';

@NgModule({
    declarations: [PaginatorComponent],
    exports: [PaginatorComponent],
    imports: [CommonModule, MaterialModule],
})
export class PaginatorModule {}

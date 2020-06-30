import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../common/material';
import { StickyErrorComponent } from './sticky-error.component';

@NgModule({
    declarations: [StickyErrorComponent],
    imports: [CommonModule, MaterialModule],
    exports: [StickyErrorComponent],
})
export class StickyErrorModule {}

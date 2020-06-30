import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BubbleErrorComponent } from './bubble-error.component';

@NgModule({
    imports: [CommonModule],
    declarations: [BubbleErrorComponent],
    exports: [BubbleErrorComponent],
})
export class BubbleErrorModule {}

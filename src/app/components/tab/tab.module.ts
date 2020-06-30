import { NgModule } from '@angular/core';
import { TabComponent } from './tab.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [TabComponent],
    exports: [TabComponent],
})
export class TabModule {}

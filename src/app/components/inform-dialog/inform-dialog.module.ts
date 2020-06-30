import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformDialogComponent } from './inform-dialog.component';
import { MaterialModule } from '../../../common/material';

@NgModule({
    declarations: [InformDialogComponent],
    entryComponents: [InformDialogComponent],
    imports: [CommonModule, MaterialModule],
})
export class InformDialogModule {}

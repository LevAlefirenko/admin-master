import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../common/material';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
    declarations: [ConfirmationDialogComponent],
    entryComponents: [ConfirmationDialogComponent],
    imports: [CommonModule, MaterialModule],
})
export class ConfirmationDialogModule {}

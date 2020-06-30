import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../../constants';
import { ConfirmationResult } from './dialog-results.enum';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    dismiss(): void {
        this.dialogRef.close(ConfirmationResult.DISMISS);
    }

    confirm(): void {
        this.dialogRef.close(ConfirmationResult.CONFIRM);
    }
}

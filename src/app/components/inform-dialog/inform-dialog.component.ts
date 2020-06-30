import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../constants';

@Component({
    selector: 'app-inform-dialog',
    templateUrl: './inform-dialog.component.html',
    styleUrls: ['./inform-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<InformDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    close(): void {
        this.dialogRef.close();
    }
}

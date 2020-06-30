import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorIntl,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
} from '@angular/material';
import { getRusPaginatorIntl } from '../russian-paginator-intl';

@NgModule({
    exports: [
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonToggleModule,
    ],
    providers: [{ provide: MatPaginatorIntl, useValue: getRusPaginatorIntl() }],
})
export class MaterialModule {}

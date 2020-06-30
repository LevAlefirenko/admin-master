import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { suggestionsRoutes } from './suggestions.routes';
import { SharedModule } from '../../../shared';
import { MaterialModule } from '../../../../common/material';
import { DataPanelModule } from '../../../components/data-panel';
import { ReactiveFormsModule } from '@angular/forms';
import { SuggestionsService } from './suggestions.service';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogModule } from '../../../components/confirmation-dialog';
import { InformDialogModule } from '../../../components/inform-dialog';

@NgModule({
    declarations: [SuggestionsComponent, SuggestionDetailsComponent],
    imports: [
        SharedModule,
        ConfirmationDialogModule,
        InformDialogModule,
        MaterialModule,
        DataPanelModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(suggestionsRoutes),
    ],
    providers: [SuggestionsService],
})
export class SuggestionsModule {}

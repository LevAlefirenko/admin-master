import { Routes } from '@angular/router';

import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';

export const suggestionsRoutes: Routes = [
    {
        path: '',
        component: SuggestionsComponent,
    },
    {
        path: ':id/details',
        component: SuggestionDetailsComponent,
    },
];

import { Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';

export const settingsRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'admins',
            },
            {
                path: 'admins',
                loadChildren: () =>
                    import('./admins/admins.module').then(m => m.AdminsModule),
            },
            {
                path: 'suggestions',
                loadChildren: () =>
                    import('./suggestions/suggestions.module').then(
                        m => m.SuggestionsModule
                    ),
            },
        ],
    },
];

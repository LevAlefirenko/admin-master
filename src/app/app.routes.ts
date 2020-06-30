import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./pages/main/main.module').then(m => m.MainModule),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./pages/login/login.module').then(m => m.LoginModule),
    },


];

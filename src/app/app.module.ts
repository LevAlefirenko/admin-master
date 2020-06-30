Roimport { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeRU from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LoaderModule } from './components/loader';
import { StickyErrorModule } from './components/sticky-error';
import { CoreModule } from './core/core.module';
import {
    ApplyTokenInterceptor,
    JsonInterceptor,
    RefreshTokenInterceptor,
    ServerErrorInterceptor,
} from './interceptors';
import { MainModule } from './pages/main/main.module';
import appReducer, { appMetaReducers } from './store';

registerLocaleData(localeRU);

@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        LoaderModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        StoreRouterConnectingModule.forRoot(),
        StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        MainModule,
        SharedModule,
        StickyErrorModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JsonInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApplyTokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorInterceptor,
            multi: true,
        },
        { provide: LOCALE_ID, useValue: 'ru-RU' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

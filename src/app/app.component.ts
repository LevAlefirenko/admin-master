import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_ERROR_MESSAGE } from './constants';
import { AppService } from './core/app/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    public hasServerErrors$: Observable<boolean>;
    serverErrorMessage = SERVER_ERROR_MESSAGE;

    constructor(private _appService: AppService) {
        this.hasServerErrors$ = this._appService.hasServerErrors$;
    }

    public onStickyClosed() {
        this._appService.cleanServerErrors();
    }
}

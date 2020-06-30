import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../core/app/app.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
    loading$: Observable<boolean>;

    constructor(private _appService: AppService) {
        this.loading$ = this._appService.loading$;
    }
}

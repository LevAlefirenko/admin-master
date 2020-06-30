import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubscriberComponent } from '../../components/subscriber';
import { TAB_HEADER } from './settings.constants';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent extends SubscriberComponent {
    header = TAB_HEADER;

    constructor(private _router: Router) {
        super();
    }

    isActive(instruction: any[]): boolean {
        return this._router.isActive(
            this._router.createUrlTree(instruction),
            true
        );
    }
    navigate(instruction: any[]) {
        this._router.navigate(instruction);
    }
}

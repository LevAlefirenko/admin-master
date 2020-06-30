import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'control-error',
    templateUrl: './control-error.component.html',
    styleUrls: ['./control-error.component.scss'],
})
export class ControlErrorComponent {
    @Input() control: FormControl;
    @Input() error: boolean;

    hasControlError() {
        if (!this.control) {
            return false;
        }

        return (
            this.control.invalid &&
            (this.control.dirty || this.control.touched) &&
            this.error
        );
    }
}

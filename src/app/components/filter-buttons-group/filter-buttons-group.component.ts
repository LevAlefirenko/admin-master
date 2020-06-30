import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Status } from '../../constants';
import {
    IFilterButtonConfig,
    IFilterButtonsGroup,
} from './filter-buttons-group.model';

@Component({
    selector: 'app-filter-buttons-group',
    templateUrl: './filter-buttons-group.component.html',
    styleUrls: ['./filter-buttons-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FilterButtonsGroupComponent),
            multi: true,
        },
    ],
})
export class FilterButtonsGroupComponent implements ControlValueAccessor {
    @Input() buttonsConfig: IFilterButtonsGroup;

    private selectedButtonValue: Status = Status.ALL;

    writeValue(value: Status) {
        this.selectedButtonValue = value;
    }

    propagateChange = (value: Status) => {};

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    onClick(clickedButton: IFilterButtonConfig): void {
        this.selectedButtonValue = clickedButton.value;

        // don't do anything in case user wants to disable default 'ALL' button
        if (!clickedButton.isActive) {
            this.buttonsConfig.buttons.forEach(
                (buttonConfig: IFilterButtonConfig) =>
                    (buttonConfig.isActive =
                        buttonConfig.value === this.selectedButtonValue
                            ? !buttonConfig.isActive
                            : false)
            );

            this.propagateChange(this.selectedButtonValue);
        }
    }
}

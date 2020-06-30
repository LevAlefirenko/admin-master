import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { IDataEntity } from '../../../models';
import {
    ActionButtonClickPayload,
    ActionDefinition,
} from '../table-config.model';

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent {
    @Input() action: ActionDefinition;
    @Input() item: IDataEntity;
    @Output() actionButtonClick: EventEmitter<
        ActionButtonClickPayload
    > = new EventEmitter<ActionButtonClickPayload>();

    onActionButtonClick(): void {
        this.actionButtonClick.emit({
            type: this.action.type,
            dataEntity: this.item,
        });
    }
}

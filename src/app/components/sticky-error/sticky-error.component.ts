import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-sticky-error',
    templateUrl: './sticky-error.component.html',
    styleUrls: ['./sticky-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyErrorComponent {
    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() message: string;

    public hide() {
        this.close.emit();
    }
}

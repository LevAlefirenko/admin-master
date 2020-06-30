import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface Error {
    code: string;
    message: string;
}
@Component({
    selector: 'bubble-error',
    templateUrl: './bubble-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./bubble-error.component.scss'],
})
export class BubbleErrorComponent {
    @Input() errors: Error[] = [];
    @Input() center: boolean;
}

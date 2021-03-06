import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class SubscriberComponent implements OnDestroy {
    protected destroy$: Subject<void> = new Subject<void>();

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

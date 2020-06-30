import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { SubscriberComponent } from '../subscriber';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent extends SubscriberComponent
    implements AfterViewInit {
    @Input() pageSize: number;
    @Input() itemsLength: number;

    @Output() public onPageNumberChange: EventEmitter<
        PageEvent
    > = new EventEmitter<PageEvent>();

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        this.paginator.page
            .pipe(takeUntil(this.destroy$))
            .subscribe((pageEvent: PageEvent) =>
                this.onPageNumberChange.emit(pageEvent)
            );
    }

    public resetPageIndex(): void {
        this.paginator.pageIndex = 0;
    }
}

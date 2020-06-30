import { DataSource } from '@angular/cdk/table';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatSort, MatTableDataSource, Sort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { IDataEntity } from '../../models';
import { SubscriberComponent } from '../subscriber';
import {
    ActionButtonClickPayload,
    IColumnDefinition,
    ITableConfigModel,
} from './table-config.model';
import { BaseDataSource } from '../../core/datasource';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent extends SubscriberComponent
    implements AfterViewInit, OnChanges, OnInit {
    @Input() dataSource:
        | DataSource<IDataEntity>
        | MatTableDataSource<IDataEntity>;
    @Input() tableConfig: ITableConfigModel;
    @Output() public onSortChange: EventEmitter<Sort> = new EventEmitter<
        Sort
    >();

    @Output() public actionButtonClick: EventEmitter<
        ActionButtonClickPayload
    > = new EventEmitter<ActionButtonClickPayload>();

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    columnNames: string[];

    constructor() {
        super();
    }

    ngOnInit() {
        this.columnNames = this.tableConfig.columns.map(column => column.name);
    }

    ngAfterViewInit() {
        if (this.dataSource instanceof BaseDataSource) {
            this.sort.sortChange
                .pipe(takeUntil(this.destroy$))
                .subscribe((sortData: Sort) =>
                    this.onSortChange.emit(sortData)
                );
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        // for client side only sorting we have to use native MatTableDataSource and do not emit httpRequests
        if (
            this.dataSource instanceof MatTableDataSource &&
            changes.dataSource &&
            changes.dataSource.currentValue
        ) {
            this.dataSource.sort = this.sort;
        }
    }

    trackByFn(index, item: IDataEntity) {
        return item.id;
    }

    onActionButtonClick(actionClickPayload: ActionButtonClickPayload): void {
        this.actionButtonClick.emit(actionClickPayload);
    }

    isActionsColumn(column: IColumnDefinition) {
        return column.name === 'actions';
    }
}

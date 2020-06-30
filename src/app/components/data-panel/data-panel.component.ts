import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, Sort } from '@angular/material';
import { Observable } from 'rxjs';
import { DEFAULT_TABLE_PAGE_SIZE, Status } from '../../constants';

import { BaseDataSource, DropdownDataSource } from '../../core/datasource';
import { PaginatorComponent } from '../paginator';
import { SubscriberComponent } from '../subscriber';
import {
    ActionButtonClickPayload,
    ITableConfigModel,
    SortDirection,
} from '../table';
import { DEFAULT_OPTION_TEXT, NO_DATA_TITLE } from './data-panel.constants';
import { takeUntil } from 'rxjs/operators';
import {
    DropdownConfig,
    DropdownOption,
    IDataEntity,
    IDataSourceRequestParams,
} from '../../models';

@Component({
    selector: 'app-data-panel',
    templateUrl: './data-panel.component.html',
    styleUrls: ['./data-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPanelComponent extends SubscriberComponent
    implements OnChanges, OnInit {
    @Input() searchPlaceholder;
    @Input() disableFilterBar: boolean;
    @Input() disableFilterButtons: boolean;
    @Input() disableDropDown: boolean;
    @Input() disablePagination: boolean;
    @Input() filterButtonsGroupConfig;
    @Input() dropDownConfig: DropdownConfig;
    @Input() tableConfig: ITableConfigModel;
    @Input() dataSource: BaseDataSource | MatTableDataSource<IDataEntity>;
    @Input() dropDownDataSource: DropdownDataSource;

    @Output()
    actionButtonClick: EventEmitter<
        ActionButtonClickPayload
    > = new EventEmitter<ActionButtonClickPayload>();

    dropDownOptions$: Observable<DropdownOption[]>;

    pageIndex: number = 0;
    pageSize = DEFAULT_TABLE_PAGE_SIZE;
    private sortData: Sort = {
        direction: SortDirection.DEFAULT,
        active: '',
    };
    dataLength: number;
    private noDataTitle = NO_DATA_TITLE;
    form: FormGroup;
    private currentParams: IDataSourceRequestParams;

    @ViewChild(PaginatorComponent, { static: false })
    paginator: PaginatorComponent;

    defaultOptionText = DEFAULT_OPTION_TEXT;

    constructor(
        private fb: FormBuilder,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
        this._createForm();
    }

    ngOnInit(): void {
        if (this.dataSource instanceof BaseDataSource) {
            this.loadData();
            this.dataSource.dataLength$
                .pipe(takeUntil(this.destroy$))
                .subscribe(dataLength => {
                    this.dataLength = dataLength;
                    this.changeDetector.detectChanges();
                });
        }

        if (!this.disableDropDown && !this.disableFilterBar) {
            this.dropDownOptions$ = this.dropDownDataSource.loadOptions();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            this.dataSource instanceof MatTableDataSource &&
            changes.dataSource &&
            changes.dataSource.currentValue
        ) {
            this.dataLength = changes.dataSource.currentValue.data.length;
        }
    }

    onActionButtonClick(payload: ActionButtonClickPayload): void {
        this.actionButtonClick.emit(payload);
    }

    protected resetPageIndex(): void {
        this.pageIndex = 0;
        this.paginator.resetPageIndex();
    }

    onSortChange(event$) {
        this.sortData = event$ as Sort;
        this.resetPageIndex();
        this.loadData();
    }

    onPageNumberChange(event$) {
        this.pageIndex = event$.pageIndex;
        this.loadData();
    }

    performSearch() {
        this.resetPageIndex();
        this.loadData();
    }

    onFilterButtonClick() {
        this.resetPageIndex();
        this.loadData();
    }

    public loadData(forceReload: boolean = false): void {
        if (this.dataSourdefaultOptionTextce instanceof BaseDataSource) {
            const params = {
                searchText: this.form.value.searchText,
                selectedValue: this.form.value.dropdown,
                status: this.form.value.filterButton,
                sortField: this.sortData.active,
                ...this.getSortParam(),
                offset: this.getOffset(),
                limit: this.pageSize,
            };

            if (
                forceReload ||
                JSON.stringify(this.currentParams) !== JSON.stringify(params)
            ) {
                this.currentParams = params;
                this.dataSource.loadData(params);
            }
        }
    }

    private getOffset(): number {
        return this.pageSize * this.pageIndex;
    }

    private getSortParam() {
        return { [this.sortData.active]: [this.sortData.direction] };
    }

    private _createForm() {
        this.form = this.fb.group({
            searchText: [''],
            filterButton: [Status.ALL],
            dropdown: [''],
        });
    }
}

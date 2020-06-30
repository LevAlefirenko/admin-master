import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataPanelComponent } from '../../components/data-panel';
import { ITableConfigModel } from '../../components/table';
import { BaseDataSource, DropdownDataSource } from '../../core/datasource';
import {
    DROPDOWN_CONFIG,
    PURCHASES_SEARCH_INPUT_PLACEHOLDER,
    PURCHASES_TAB_HEADER,
    PURCHASES_TABLE_CONFIG,
} from './purchases.constants';

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BaseDataSource, DropdownDataSource],
})
export class PurchasesComponent {
    header = PURCHASES_TAB_HEADER;
    searchPlaceholder = PURCHASES_SEARCH_INPUT_PLACEHOLDER;

    dropDownConfig = DROPDOWN_CONFIG;
    tableConfig: ITableConfigModel = PURCHASES_TABLE_CONFIG;
    @ViewChild(DataPanelComponent, { static: true })
    dataPanel: DataPanelComponent;

    constructor(
        public dataSource: BaseDataSource,
        public dropdownDataSource: DropdownDataSource
    ) {}
}

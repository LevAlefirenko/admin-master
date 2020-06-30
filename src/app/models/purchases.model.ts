import { SortDirection } from '../components/table';
import { IDataEntity } from './page-data.model';
import { IDataSourceRequestParams } from './request-params.model';

export interface Purchase extends IDataEntity {
    date: string;
    money: number;
    service: string;
    name: string;
}

export interface PurchasesRequestParams extends IDataSourceRequestParams {
    searchText: string;
    date: SortDirection;
    service: SortDirection;
    money: SortDirection;
    name: SortDirection;
    selectedValue?: string;
}

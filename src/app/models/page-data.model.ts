import { Status } from '../constants';
import { ActionDefinition } from '../components/table';

export interface IPageData<IDataEntity> {
    records: IDataEntity[];
    total: number;
}

export interface DataEntityDTO {
    id?: string;
    status?: Status;
}

export interface IDataEntity {
    id?: string;
    name?: string;
    status?: Status;
    actions?: ActionDefinition[];
}

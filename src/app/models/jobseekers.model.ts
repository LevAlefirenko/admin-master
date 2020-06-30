import { SortDirection } from '../components/table';
import { Status } from '../constants';
import { IDataEntity } from './page-data.model';
import { IDataSourceRequestParams } from './request-params.model';

export interface Jobseeker extends IDataEntity {
    name: string;
    phone: string;
    createdAt: Date;
    email: string;
    isEmailConfirmed: boolean;
    address: string;
    citizenship: string;
    birthDate: string;
    avatarUrl: string;
}

export interface JobseekersRequestParams extends IDataSourceRequestParams {
    searchText: string;
    name: SortDirection;
    createdAt: SortDirection;
    status: Status;
}

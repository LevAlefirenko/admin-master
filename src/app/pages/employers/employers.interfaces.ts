import { DataEntityDTO, IDataSourceRequestParams } from '../../models';
import { SortDirection } from '../../components/table';
import { Status } from '../../constants';

export interface EmployersPageDataDTO {
    employers: EmployerDTO[];
    total: number;
}

export interface EmployerDTO extends DataEntityDTO {
    name: string;
    company: string;
    phone: string;
    createdAt: Date;
    companyAddress: string;
    email: string;
    city: string;
}

export interface IEmployersRequestParams extends IDataSourceRequestParams {
    searchText: string;
    name: SortDirection;
    company: SortDirection;
    createdAt: SortDirection;
    status: Status;
}

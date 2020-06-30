import { SortDirection } from '../../components/table';
import { Status } from '../../constants';
import {
    ComplaintType,
    DataEntityDTO,
    IDataSourceRequestParams,
} from '../../models';
import { CVDTO } from '../cvs/cvs.interfaces';
import { EmployerDTO } from '../employers/employers.interfaces';
import { JobseekerDTO } from '../jobseekers/jobseeker.interfaces';

export interface ComplaintDTO extends DataEntityDTO {
    date: string;
    type: ComplaintType;
    reason: EmployerDTO | CVDTO;
    origin: EmployerDTO | JobseekerDTO;
    text: string;
}

export interface ComplaintRequestParams extends IDataSourceRequestParams {
    searchText: string;
    date: SortDirection;
    text: SortDirection;
    origin: SortDirection;
    status: Status;
}

export interface ComplaintPageDataDTO {
    complaints: ComplaintDTO[];
    total: number;
}

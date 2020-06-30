import { SortDirection } from '../../components/table';
import { Education, LegalDocument, SalaryType, Status } from '../../constants';
import { DataEntityDTO, IDataSourceRequestParams } from '../../models';
import {
    EmploymentType,
    ExperienceItem,
    Schedule,
} from '../../models/cv.model';
import { JobseekerDTO } from '../jobseekers/jobseeker.interfaces';

export interface CVsRequestParams extends IDataSourceRequestParams {
    searchText: string;
    name: SortDirection;
    salaryRange: SortDirection;
    position: SortDirection;
    createdAt: SortDirection;
    status: Status;
}

export interface CVDTO extends DataEntityDTO {
    name: string;
    position: string;
    salaryType: SalaryType;
    salaryFrom: number;
    salaryTo: number;
    experience: ExperienceItem[];
    education: Education;
    educationPlaceName: string;
    specialityName: string;
    languages: string;
    documents: LegalDocument[];
    about: string;
    views: number;
    updated: string;
    employmentType: EmploymentType;
    schedule: Schedule;
}

export interface ExtendedCVDTO extends DataEntityDTO {
    cv: CVDTO;
    jobseeker: JobseekerDTO;
}

export interface CVPageDataDTO {
    cvs: ExtendedCVDTO[];
    total: number;
}

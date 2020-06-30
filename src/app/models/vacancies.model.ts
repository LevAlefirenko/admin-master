import { SortDirection } from '../components/table';
import { Education, LegalDocument, SalaryType, Status } from '../constants';
import { IEmployer } from './employers.model';
import { IDataEntity } from './page-data.model';
import { IDataSourceRequestParams } from './request-params.model';

export interface IVacancy extends IDataEntity {
    title: string;
    salaryType: SalaryType;
    createdAt: Date;
    salaryFrom: number;
    salaryTo: number;
    description: string;
    address: string;
    education: Education;
    language: string;
    documents: LegalDocument[];
}

export interface IVacancyData extends IDataEntity {
    vacancy: IVacancy;
    employer: IEmployer;
}

export interface IVacancyListItem extends IDataEntity {
    title: string;
    createdAt: Date;
    salaryRange: string;
    company: string;
}

export interface IVacanciesPageData {
    vacancies: IVacancyData[];
    total: number;
}

export interface IVacanciesRequestParams extends IDataSourceRequestParams {
    searchText: string;
    title: SortDirection;
    company: SortDirection;
    position: SortDirection;
    salaryRange: SortDirection;
    createdAt: SortDirection;
    status: Status;
}

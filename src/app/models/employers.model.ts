import { Education, LegalDocument, SalaryType } from '../constants';
import { IDataEntity } from './page-data.model';

export interface IEmployer extends IDataEntity {
    name: string;
    company: string;
    companyAddress: string;
    email: string;
    phone: string;
    city: string;
    createdAt: Date;
}

export interface IEmployerVacancy extends IDataEntity {
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
    href: string;
}

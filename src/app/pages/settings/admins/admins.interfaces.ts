import { IDataSourceRequestParams } from '../../../models';
import { SortDirection } from '../../../components/table';

export interface AdminPageDataDTO {
    admins: AdminDTO[];
    total: number;
}

export interface AdminDTO {
    login: string;
    permissions: AdminPermissionsDTO;
    id: string;
}

export interface AdminPermissionsDTO {
    [key: string]: string;
}

export interface AdminsRequestParams extends IDataSourceRequestParams {
    login: SortDirection;
}

export const PERMISSTIONS_SECTION = {
    EMPLOYERS: 'employers',
    JOBSEEKERS: 'jobseekers',
    VACANCIES: 'vacancies',
    CVS: 'cvs',
    ADMINS: 'admins',
    COMPLAINTS: 'complaints',
    PURCHASES: 'purchases',
    SERVICES: 'services',
};

export enum Permission {
    READ = 'read',
    WRITE = 'write',
    NO = '',
}

export const PERMISSIONS_SECTION_TITLES = {
    [PERMISSTIONS_SECTION.EMPLOYERS]: 'Работодатели',
    [PERMISSTIONS_SECTION.ADMINS]: 'Администраторы',
    [PERMISSTIONS_SECTION.JOBSEEKERS]: 'Соискатели',
    [PERMISSTIONS_SECTION.CVS]: 'Резюме',
    [PERMISSTIONS_SECTION.VACANCIES]: 'Вакансии',
    [PERMISSTIONS_SECTION.COMPLAINTS]: 'Жалобы',
    [PERMISSTIONS_SECTION.PURCHASES]: 'Покупки',
    [PERMISSTIONS_SECTION.SERVICES]: 'Услуги',
};

export const PERMISSIONS_TITLES = {
    [Permission.READ]: 'Чтение',
    [Permission.WRITE]: 'Запись',
    [Permission.NO]: 'Без доступа',
};

export interface AdminUpdateRequest {
    password?: string;
    login: string;
    permissions: AdminPermissionsDTO;
}

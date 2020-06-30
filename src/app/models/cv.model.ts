import { SalaryType } from '../constants';
import { Jobseeker } from './jobseekers.model';
import { IDataEntity } from './page-data.model';

export interface CV extends IDataEntity {
    name: string;
    position: string;
    salaryType: SalaryType;
    salaryFrom: number;
    salaryTo: number;
    experience: ExperienceItem[];
    education: string;
    educationPlaceName: string;
    specialityName: string;
    languages: string;
    documents: string[];
    about: string;
    views: number;
    updated: string;
    employmentType: string;
    schedule: string;
    href?: string;
}

export interface ExtendedCV {
    cv: CV;
    jobseeker: Jobseeker;
}

export interface CVListItem extends IDataEntity {
    name: string;
    salaryRange: string;
    position: string;
    createdAt: string;
}

export interface ExperienceItem extends IDataEntity {
    position: string;
    company: string;
    city: string;
    startDate: string;
    endDate: string;
}

export enum EmploymentType {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    PROJECT_WORK = 'project work',
    SECONDARY_WORK = 'secondary work',
    INTERSHIP = 'internship',
}

export enum Schedule {
    ANY = 'any',
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    SHIFT_WORK = 'shift work',
    FLEX_TIME = 'flextime',
    REMOTE_WORK = 'remote work',
    FLY_IN_OUT = 'fly-in/fly-out',
}

export const LocalizedSchedule = {
    [Schedule.ANY]: 'Любой',
    [Schedule.FULL_TIME]: 'Полный день',
    [Schedule.PART_TIME]: 'Неполный день',
    [Schedule.SHIFT_WORK]: 'Работа по сменам',
    [Schedule.FLEX_TIME]: 'Плавающий график',
    [Schedule.REMOTE_WORK]: 'Удаленная работа',
    [Schedule.FLY_IN_OUT]: 'Вахтовый метод',
};

export const LocalizedEmploymentType = {
    [EmploymentType.FULL_TIME]: 'Полная занятость',
    [EmploymentType.PART_TIME]: 'Частичная занятость',
    [EmploymentType.PROJECT_WORK]: 'Проектная работа',
    [EmploymentType.SECONDARY_WORK]: 'Работа по совместительству',
    [EmploymentType.INTERSHIP]: 'Стажировка',
};

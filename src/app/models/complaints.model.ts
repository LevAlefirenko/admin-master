import { IDataEntity } from './page-data.model';

export interface Complaint extends IDataEntity {
    date: string;
    type: ComplaintType;
    reason: string;
    origin: string;
    text: string;
}

export interface ExtendedComplaint extends IDataEntity {
    date: string;
    type: ComplaintType;
    reason: ComplaintReason;
    origin: ComplaintOrigin;
    text: string;
}

export interface ComplaintOrigin {
    name: string;
    phone: string;
    email: string;
}

export interface ComplaintReason {
    title: string;
    href: string;
}

export enum ComplaintType {
    CV = 'cv',
    EMPLOYER = 'employer ',
}

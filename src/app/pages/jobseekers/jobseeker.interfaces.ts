import { DataEntityDTO, Jobseeker } from '../../models';

export interface JobseekersPageDataDTO {
    jobseekers: Jobseeker[];
    total: number;
}

export interface JobseekerDTO extends DataEntityDTO {
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

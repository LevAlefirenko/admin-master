import { IDataEntity } from './page-data.model';

export interface ExtendedPayableService extends IDataEntity {
    name: string;
    description: string;
    firstPeriodDays: number;
    firstPeriodCost: number;
    secondPeriodDays: number;
    secondPeriodCost: number;
    thirdPeriodDays: number;
    thirdPeriodCost: number;
    createdAt: Date;
}

export interface PayableServiceData {
    name: string;
    description: string;
    firstPeriodDays: number;
    firstPeriodCost: number;
    secondPeriodDays: number;
    secondPeriodCost: number;
    thirdPeriodDays: number;
    thirdPeriodCost: number;
}

export interface PayableServiceListItem extends IDataEntity {
    name: string;
    minCost: string;
    paymentAmount: string;
    createdAt: Date;
}

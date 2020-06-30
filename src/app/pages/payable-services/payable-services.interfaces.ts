import { DataEntityDTO } from '../../models';

export interface PayableServiceDTO extends DataEntityDTO {
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

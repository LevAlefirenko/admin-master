import { DataEntityDTO } from '../../models';
import { EmployerDTO } from '../employers/employers.interfaces';
import { PayableServiceDTO } from '../payable-services/payable-services.interfaces';

export interface PurchaseDTO extends DataEntityDTO {
    date: string;
    money: number;
    service: PayableServiceDTO;
    buyer: EmployerDTO;
}

export interface PurchasesPageDataDTO {
    purchases: PurchaseDTO[];
    total: number;
}

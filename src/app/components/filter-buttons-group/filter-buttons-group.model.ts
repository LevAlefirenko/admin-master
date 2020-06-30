import { Status } from '../../constants';

export interface IFilterButtonsGroup {
    buttons: IFilterButtonConfig[];
}

export interface IFilterButtonConfig {
    text: string;
    isActive: boolean;
    value: Status;
}

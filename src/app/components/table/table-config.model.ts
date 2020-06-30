import { IDataEntity } from '../../models';

export interface ITableConfigModel {
    columns: IColumnDefinition[];
}

export interface IColumnDefinition {
    name: string;
    headerTitle: string;
    sortable: boolean;
    cellType?: string;
    actions?: ActionDefinition[];
}

export interface ActionDefinition {
    type: ActionType;
    title?: string;
}

export enum ActionType {
    DETAILS,
    BLOCK,
    UNLOCK,
    ACTIVATE,
    SWITCH_OFF,
    EDIT,
    REMOVE,
    ARCHIVE,
}

export const ACTION_TITLE = {
    [ActionType.DETAILS]: 'Подробнее',
    [ActionType.BLOCK]: 'Заблокировать',
    [ActionType.UNLOCK]: 'Разблокировать',
    [ActionType.ACTIVATE]: 'Активировать',
    [ActionType.EDIT]: 'Редактировать',
    [ActionType.REMOVE]: 'Удалить',
    [ActionType.ARCHIVE]: 'Перенести в архив',
    [ActionType.SWITCH_OFF]: 'Отключить',
};

export interface ActionButtonClickPayload {
    type: ActionType;
    dataEntity: IDataEntity;
}

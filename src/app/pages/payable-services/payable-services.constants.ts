import { DialogData, TABLE_CELL_FORMATS } from '../../constants';

export const PAYABLE_SERVICES_TAB_HEADER = 'Платные услуги';
export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку платных услуг',
    route: '/payable-services',
};

export const STATUS_CHANGED_DIALOG_DATA: DialogData = {
    title: 'Статус услуги успешно обновлен',
};

export const CONFIRMATION_DIALOG_BODY = 'Вы точно хотите {action} услугу?';

export const PAYABLE_SERVICES_FETCHING = 'PAYABLE_SERVICES_FETCHING';
export const PAYABLE_SERVICE_FETCHING = 'PAYABLE_SERVICE_FETCHING';
export const PAYABLE_SERVICE_UPDATING = 'PAYABLE_SERVICE_UPDATING';
export const PAYABLE_SERVICE_CHANGE_STATUS = 'PAYABLE_SERVICE_CHANGE_STATUS';

export const PAYABLE_SERVICES_TABLE_CONFIG = {
    columns: [
        {
            name: 'name',
            headerTitle: 'Название',
            sortable: true,
        },
        {
            name: 'minCost',
            headerTitle: 'Стоимость',
            sortable: true,
        },
        {
            name: 'paymentAmount',
            headerTitle: 'Размер оплаты',
            sortable: true,
        },
        {
            name: 'createdAt',
            headerTitle: 'Дата создания',
            sortable: true,
            cellType: TABLE_CELL_FORMATS.DATE,
        },
        {
            name: 'actions',
            headerTitle: '',
            sortable: false,
        },
    ],
};

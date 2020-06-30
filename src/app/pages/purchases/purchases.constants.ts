import { TABLE_CELL_FORMATS } from '../../constants';
import { DropdownConfig } from '../../models';

export const PURCHASES_FETCHING = 'PURCHASES_FETCHING';
export const PAYABLE_SERVICES_DROPDOWN_DATA_FETCHING =
    'PAYABLE_SERVICES_DROPDOWN_DATA_FETCHING';
export const PURCHASES_TAB_HEADER = 'История покупок';
export const PURCHASES_SEARCH_INPUT_PLACEHOLDER = 'Поиск по покупателю';

export const PURCHASES_TABLE_CONFIG = {
    columns: [
        {
            name: 'date',
            headerTitle: 'Дата',
            cellType: TABLE_CELL_FORMATS.DATE,
            sortable: true,
        },
        {
            name: 'name',
            headerTitle: 'Покупатель',
            sortable: true,
        },
        {
            name: 'service',
            headerTitle: 'Услуга',
            sortable: true,
        },
        {
            name: 'money',
            headerTitle: 'Сумма',
            cellType: TABLE_CELL_FORMATS.CURRENCY,
            sortable: true,
        },
    ],
};

export const DROPDOWN_CONFIG: DropdownConfig = {
    labelText: 'Услуга',
};

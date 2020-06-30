import { IFilterButtonsGroup } from '../../components/filter-buttons-group';
import { DialogData, Status, TABLE_CELL_FORMATS } from '../../constants';

export const COMPLAINTS_TAB_HEADER = 'Жалобы';
export const COMPLAINTS_SEARCH_INPUT_PLACEHOLDER =
    'Поиск по телефону или жалобе';

export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку жалоб',
    route: '/complaints',
};

export const COMPLAINTS_TABLE_CONFIG = {
    columns: [
        {
            name: 'date',
            headerTitle: 'Дата',
            cellType: TABLE_CELL_FORMATS.DATE,
            sortable: true,
        },
        {
            name: 'origin',
            headerTitle: 'Пользователь',
            cellType: TABLE_CELL_FORMATS.PHONE,
            sortable: true,
        },
        {
            name: 'text',
            headerTitle: 'Жалоба',
            sortable: true,
        },
        {
            name: 'actions',
            headerTitle: '',
            sortable: false,
        },
    ],
};

export const COMPLAINTS_FILTER_BUTTONS_CONFIG: IFilterButtonsGroup = {
    buttons: [
        {
            value: Status.ALL,
            text: 'Все',
            isActive: true,
        },
        {
            value: Status.ACTIVE,
            text: 'Активные',
            isActive: false,
        },

        {
            value: Status.ARCHIVED,
            text: 'Архив',
            isActive: false,
        },
    ],
};

export const STATUS_CHANGED_DIALOG_DATA: DialogData = {
    title: 'Статус жалобы успешно обновлен',
};

export const CONFIRMATION_DIALOG_BODY = 'Вы точно хотите {action} жалобу?';

export const COMPLAINTS_FETCHING = 'COMPLAINTS_FETCHING';
export const COMPLAINT_FETCHING = 'COMPLAINT_FETCHING';
export const COMPLAINT_CHANGE_STATUS = 'CV_CHANGE_STATUS';

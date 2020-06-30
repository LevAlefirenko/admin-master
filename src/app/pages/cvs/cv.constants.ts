import { IFilterButtonsGroup } from '../../components/filter-buttons-group';
import { DialogData, Status, TABLE_CELL_FORMATS } from '../../constants';

export const CV_TAB_HEADER = 'Резюме';
export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку резюме',
    route: '/cv',
};

export const CVS_SEARCH_INPUT_PLACEHOLDER =
    'Поиск вакансии по названию организации или должности';

export const CVS_TABLE_CONFIG = {
    columns: [
        {
            name: 'name',
            headerTitle: 'ФИО',
            sortable: true,
        },
        {
            name: 'position',
            headerTitle: 'Желаемая должность',
            sortable: true,
        },
        {
            name: 'salaryRange',
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

export const STATUS_CHANGED_DIALOG_DATA: DialogData = {
    title: 'Статус резюме успешно обновлен',
};

export const CONFIRMATION_DIALOG_BODY = 'Вы точно хотите {action} резюме?';

export const CVS_FILTER_BUTTONS_CONFIG: IFilterButtonsGroup = {
    buttons: [
        {
            value: Status.ALL,
            text: 'Все',
            isActive: true,
        },
        {
            value: Status.MODERATION,
            text: 'На модерации',
            isActive: false,
        },
        {
            value: Status.ACTIVE,
            text: 'Активные',
            isActive: false,
        },

        {
            value: Status.BLOCKED,
            text: 'Заблокированные',
            isActive: false,
        },
    ],
};

export const CVS_FETCHING = 'CVS_FETCHING';
export const CV_FETCHING = 'CV_FETCHING';
export const CV_CHANGE_STATUS = 'CV_CHANGE_STATUS';

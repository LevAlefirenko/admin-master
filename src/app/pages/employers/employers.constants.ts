import { DialogData, Status, TABLE_CELL_FORMATS } from '../../constants';
import { IFilterButtonsGroup } from '../../components/filter-buttons-group';

export const EMPLOYERS_TAB_HEADER = 'Работодатели';
export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку работодателей',
    route: '/employers',
};

export const EMPLOYERS_SEARCH_INPUT_PLACEHOLDER =
    'Поиск работодателя по имени, названию организации, телефону';
export const EMPLOYERS_TABLE_CONFIG = {
    columns: [
        {
            name: 'name',
            headerTitle: 'ФИО',
            sortable: true,
        },
        {
            name: 'company',
            headerTitle: 'Организация',
            sortable: true,
        },
        {
            name: 'phone',
            headerTitle: 'Номер телефона',
            cellType: TABLE_CELL_FORMATS.PHONE,
            sortable: false,
        },
        {
            name: 'createdAt',
            headerTitle: 'Дата регистрации',
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

export const EMPLOYERS_FILTER_BUTTONS_CONFIG: IFilterButtonsGroup = {
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
            value: Status.BLOCKED,
            text: 'Заблокированные',
            isActive: false,
        },
    ],
};

export const CONFIRMATION_DIALOG_BODY =
    'Вы точно хотите {action} работодателя?';

export const STATUS_CHANGED_DIALOG_DATA: DialogData = {
    title: 'Статус работодателя успешно обновлен',
};

export const GO_TO_VACANCY_LINK = '/vacancies/{id}/details';

export const EMPLOYERS_FETCHING = 'EMPLOYERS_FETCHING';
export const EMPLOYER_FETCHING = 'EMPLOYER_FETCHING';
export const EMPLOYER_VACANCIES_FETCHING = 'EMPLOYER_VACANCIES_FETCHING';
export const EMPLOYER_CHANGE_STATUS = 'EMPLOYER_CHANGE_STATUS';

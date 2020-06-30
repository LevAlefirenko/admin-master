import { IFilterButtonsGroup } from '../../components/filter-buttons-group';
import { DialogData, Status, TABLE_CELL_FORMATS } from '../../constants';

export const VACANCIES_TAB_HEADER = 'Вакансии';
export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку вакансий',
    route: '/vacancies',
};

export const VACANCIES_FETCHING = 'VACANCIES_FETCHING';
export const VACANCY_FETCHING = 'VACANCY_FETCHING';
export const VACANCY_CHANGE_STATUS = 'VACANCY_CHANGE_STATUS';

export const VACANCIES_FILTER_BUTTONS_CONFIG: IFilterButtonsGroup = {
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

export const STATUS_CHANGED_DIALOG_DATA: DialogData = {
    title: 'Статус вакансии успешно обновлен',
};

export const VACANCIES_SEARCH_INPUT_PLACEHOLDER =
    'Поиск вакансии по названию организации или должности';

export const VACANCIES_TABLE_CONFIG = {
    columns: [
        {
            name: 'company',
            headerTitle: 'Организация',
            sortable: true,
        },
        {
            name: 'title',
            headerTitle: 'Должность',
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

export const GO_TO_EMPLOYER_LINK = '/employers/{id}/details';
export const CONFIRMATION_DIALOG_BODY = 'Вы точно хотите {action} вакансию?';

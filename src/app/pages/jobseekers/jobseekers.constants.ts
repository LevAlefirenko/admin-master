import { IFilterButtonsGroup } from '../../components/filter-buttons-group';
import { DialogData, Status, TABLE_CELL_FORMATS } from '../../constants';

export const JOBSEEKERS_TAB_HEADER = 'Соискатели';
export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку соискателей',
    route: '/jobseekers',
};

export const JOBSEEKERS_SEARCH_INPUT_PLACEHOLDER =
    'Поиск соискателя по имени или телефону';
export const JOBSEEKERS_TABLE_CONFIG = {
    columns: [
        {
            name: 'name',
            headerTitle: 'Имя',
            sortable: true,
        },
        {
            name: 'phone',
            headerTitle: 'Номер телефона',
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

export const JOBSEEKERS_FILTER_BUTTONS_CONFIG: IFilterButtonsGroup = {
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

export const STATUS_CHANGED_DIALOG_DATA: DialogData = {
    title: 'Статус соискателя успешно обновлен',
};

export const CONFIRMATION_DIALOG_BODY = 'Вы точно хотите {action} соискателя?';

export const JOBSEEKERS_FETCHING = 'JOBSEEKERS_FETCHING';
export const JOBSEEKER_FETCHING = 'JOBSEEKER_FETCHING';
export const JOBSEEKER_CVS_FETCHING = 'JOBSEEKER_CVS_FETCHING';
export const JOBSEEKER_CHANGE_STATUS = 'JOBSEEKER_CHANGE_STATUS';

export const GO_TO_CV_LINK = '/cv/{id}/details';

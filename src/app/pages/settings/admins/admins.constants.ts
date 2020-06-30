import { DialogData } from '../../../constants';

export const ADMINS_TAB_HEADER = 'Администраторы';
export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку администраторов',
    route: '/settings/admins',
};

export const ADMINS_TABLE_CONFIG = {
    columns: [
        {
            name: 'login',
            headerTitle: 'E-mail',
            sortable: true,
        },
        {
            name: 'actions',
            headerTitle: '',
            sortable: false,
        },
    ],
};
export const ADMIN_FETCHING = 'ADMIN_FETCHING';
export const ADMIN_REMOVE_FETCHING = 'ADMIN_REMOVE_FETCHING';
export const ADMINS_FETCHING = 'ADMINS_FETCHING';
export const ADMIN_UPDATE = 'ADMIN_UPDATE';
export const ADMIN_CREATE = 'ADMIN_CREATE';
export const CONFIRMATION_DIALOG_BODY =
    'Вы точно хотите удалить администратора?';

export const REMOVE_SUCCESS_DIALOG_DATA: DialogData = {
    title: 'Администратор успешно удален!',
};

export const REMOVE_ERROR_DIALOG_DATA: DialogData = {
    title: 'При удалении произошла ошибка. Попробуйте еще раз.',
};

export const INVALID_ID = -1;

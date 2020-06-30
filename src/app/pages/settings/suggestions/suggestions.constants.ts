import { DialogData } from '../../../constants';

export const SUGGESTIONS_FETCHING = 'SUGGESTIONS_FETCHING';
export const SUGGESTION_FETCHING = 'SUGGESTION_FETCHING';
export const SUGGESTION_REMOVE_FETCHING = 'SUGGESTION_REMOVE_FETCHING';
export const SUGGESTION_UPDATE = 'SUGGESTION_UPDATE';
export const SUGGESTION_CREATE = 'SUGGESTION_CREATE';
export const SUGGESTIONS_TAB_HEADER = 'Подсказки';
export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку подсказок',
    route: '/settings/suggestions',
};
export const CONFIRMATION_DIALOG_BODY = 'Вы точно хотите удалить подсказку?';
export const INVALID_ID = -1;

export const REMOVE_SUCCESS_DIALOG_DATA: DialogData = {
    title: 'Подсказка успешно удалена!',
};
export const REMOVE_ERROR_DIALOG_DATA: DialogData = {
    title: 'При удалении произошла ошибка. Попробуйте еще раз.',
};

export const SUGGESTIONS_TABLE_CONFIG = {
    columns: [
        {
            name: 'title',
            headerTitle: 'Подсказка',
            sortable: true,
        },
        {
            name: 'actions',
            headerTitle: '',
            sortable: false,
        },
    ],
};

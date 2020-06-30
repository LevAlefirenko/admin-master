import { DialogData } from '../../../../constants';

export const UPDATE_SUCCESS_DIALOG_DATA: DialogData = {
    title: 'Подсказка успешно обновлена!',
};
export const UPDATE_ERROR_DIALOG_DATA: DialogData = {
    title: 'При обновлении произошла ошибка. Попробуйте еще раз.',
};

export const CREATE_SUCCESS_DIALOG_DATA: DialogData = {
    title: 'Подсказка успешно создана!',
};
export const CREATE_ERROR_DIALOG_DATA: DialogData = {
    title: 'При создании произошла ошибка. Попробуйте еще раз.',
};

export enum SuggestionFormState {
    Create,
    Edit,
}

export const RETURN_TO_LIST_LINK = {
    title: 'Вернуться к списку подсказок',
    route: '/settings/suggestions',
};

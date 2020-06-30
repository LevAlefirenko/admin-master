import { DialogData } from '../../../../constants';

export const UPDATE_ERROR_DIALOG_DATA: DialogData = {
    title: 'При обновлении произошла ошибка. Попробуйте еще раз.',
};

export const UPDATE_SUCCESS_DIALOG_DATA: DialogData = {
    title: 'Администратор успешно обновлен!',
};

export const CREATE_SUCCESS_DIALOG_DATA: DialogData = {
    title: 'Администратор успешно создан!',
};

export const CREATE_ERROR_DIALOG_DATA: DialogData = {
    title: 'При создании произошла ошибка. Попробуйте еще раз.',
};

export enum AdminFormState {
    Create,
    Edit,
}

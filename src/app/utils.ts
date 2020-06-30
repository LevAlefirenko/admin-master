import { Observable } from 'rxjs';
import { CONFIRMATION_DIALOG_DATA, DialogData, Status } from './constants';
import { ACTION_TITLE, ActionType } from './components/table';
import { HttpParams } from '@angular/common/http';

export const applyTemplate = (
    template: string,
    replacements: any,
    encode: boolean = true
): string => {
    return template.replace(/{(\w+)}/g, function(e, n) {
        return undefined !== replacements[n]
            ? encode
                ? encodeURIComponent(replacements[n])
                : replacements[n]
            : '';
    });
};
export const getValue = <T>(observable: Observable<T>): T => {
    let value: T;
    const subscription = observable.subscribe(x => {
        value = x;
    });
    subscription.unsubscribe();
    return value;
};

export const maskPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(
        /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
        '$1 ($2) $3-$4-$5'
    );
};

export function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export const getOppositeStatus = (status: Status): Status => {
    if (status) {
        return status === Status.ACTIVE ? Status.BLOCKED : Status.ACTIVE;
    }
    return null;
};

export const getDialogData = (
    action: ActionType,
    dialogBody: string,
    dialogTitle?: string
): DialogData => {
    const actionName = action ? ACTION_TITLE[action].toLowerCase() : null;
    const resultDialogBody = applyTemplate(
        dialogBody,
        {
            action: actionName,
        },
        false
    );

    return {
        title:
            dialogTitle !== undefined
                ? dialogTitle
                : CONFIRMATION_DIALOG_DATA.title,
        body: resultDialogBody,
    };
};

export const composeHttpParams = (params: Object): HttpParams =>
    Object.entries(getNonEmptyPropsObject(params)).reduce(
        (paramsAccum, [key, value]) => paramsAccum.set(key, value),
        new HttpParams()
    );

export const getNonEmptyPropsObject = (obj: Object): Object =>
    Object.entries(obj).reduce(
        (accum, [key, value]) =>
            value === '' ? accum : { ...accum, [key]: value },
        {}
    );

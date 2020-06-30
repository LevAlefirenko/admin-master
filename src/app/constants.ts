import { environment } from '../environments/environment';

export const DATE_FORMAT: string = 'dd.MM.yy HH:mm';
export const LONG_MONTH_DATE_FORMAT: string = 'dd MMMM HH:mm';
export const CURRENCY_CODE = 'RUB';
export const DEFAULT_TABLE_PAGE_SIZE = 10;

export enum TABLE_CELL_FORMATS {
    STRING = 'string',
    DATE = 'date',
    PHONE = 'phone',
    CURRENCY = 'currency',
}
з
export enum Status {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
    BLOCKED = 'blocked',
    MODERATION = 'moderation',
    ALL = '',
}

export enum SalaryType {
    MONTH = 'month',
    SHIFT = 'shift',
    HOUR = 'hour',
}

export enum Education {
    HIGH = 'high',
    PROFESSIONAL = 'professional',
    SCHOOL = 'school',
    NONE = 'none',
}

export enum LegalDocument {
    MEDICAL = 'medical',
    DRIVER_A = 'driverLicenseA',
    DRIVER_B = 'driverLicenseB',
    DRIVER_C = 'driverLicenseC',
    DRIVER_D = 'driverLicenseD',
}

export const LocalizedDocumentNames = {
    [LegalDocument.MEDICAL]: 'Медицинская книжка',
    [LegalDocument.DRIVER_A]: 'Права категории А',
    [LegalDocument.DRIVER_B]: 'Права категории B',
    [LegalDocument.DRIVER_C]: 'Права категории C',
    [LegalDocument.DRIVER_D]: 'Права категории D',
};

export const LocalizedEducationNames = {
    [Education.HIGH]: 'высшее',
    [Education.PROFESSIONAL]: 'среднее-специальное',
    [Education.SCHOOL]: 'среднее',
    [Education.NONE]: 'без образования',
};

export const ENDPOINT_ENTRY = environment.api;

export const API_URL = '/api/v1';

export const API_URLS = {
    REFRESH_TOKEN: `${ENDPOINT_ENTRY}${API_URL}/auth/refresh`,
    LOGIN: `${ENDPOINT_ENTRY}${API_URL}/auth`,
    ADMIN_CURRENT: `${ENDPOINT_ENTRY}${API_URL}/admins/current`,
    EMPLOYERS: `${ENDPOINT_ENTRY}${API_URL}/employers`,
    EMPLOYER: `${ENDPOINT_ENTRY}${API_URL}/employers/{id}`,
    EMPLOYER_VACANCIES: `${ENDPOINT_ENTRY}${API_URL}/employers/{id}/vacancies`,
    EMPLOYER_CHANGE_STATUS: `${ENDPOINT_ENTRY}${API_URL}/employers/{id}/status`,
    JOBSEEKERS: `${ENDPOINT_ENTRY}${API_URL}/jobseekers`,
    JOBSEEKER: `${ENDPOINT_ENTRY}${API_URL}/jobseekers/{id}`,
    JOBSEEKER_CVS: `${ENDPOINT_ENTRY}${API_URL}/jobseekers/{id}/cvs`,
    JOBSEEKER_CHANGE_STATUS: `${ENDPOINT_ENTRY}${API_URL}/jobseekers/{id}/status`,
    VACANCIES: `${ENDPOINT_ENTRY}${API_URL}/vacancies`,
    VACANCY: `${ENDPOINT_ENTRY}${API_URL}/vacancies/{id}`,
    VACANCY_CHANGE_STATUS: `${ENDPOINT_ENTRY}${API_URL}/vacancies/{id}/status`,
    ADMINS: `${ENDPOINT_ENTRY}${API_URL}/admins`,
    ADMIN: `${ENDPOINT_ENTRY}${API_URL}/admins/{id}`,
    REMOVE_ADMIN: `${ENDPOINT_ENTRY}${API_URL}/admins/{id}`,
    CVS: `${ENDPOINT_ENTRY}${API_URL}/cvs`,
    CV: `${ENDPOINT_ENTRY}${API_URL}/cvs/{id}`,
    CV_CHANGE_STATUS: `${ENDPOINT_ENTRY}${API_URL}/cvs/{id}/status`,
    COMPLAINTS: `${ENDPOINT_ENTRY}${API_URL}/complaints`,
    COMPLAINT: `${ENDPOINT_ENTRY}${API_URL}/complaints/{id}`,
    COMPLAINT_CHANGE_STATUS: `${ENDPOINT_ENTRY}${API_URL}/complaints/{id}/status`,
    PAYABLE_SERVICES: `${ENDPOINT_ENTRY}${API_URL}/services/payable`,
    PAYABLE_SERVICE: `${ENDPOINT_ENTRY}${API_URL}/services/payable/{id}`,
    PAYABLE_SERVICE_CHANGE_STATUS: `${ENDPOINT_ENTRY}${API_URL}/services/payable/{id}/status`,
    PURCHASES: `${ENDPOINT_ENTRY}${API_URL}/purchases`,
    SUGGESTIONS: `${ENDPOINT_ENTRY}${API_URL}/suggestions`,
    SUGGESTION: `${ENDPOINT_ENTRY}${API_URL}/suggestions/{id}`,
};

export const SERVER_ERROR_MESSAGE: string =
    'Сервер временно недоступен. Повторите попытку позже';

export const CONFIRMATION_DIALOG_DATA: DialogData = {
    title: 'Подтвердите действие',
    body: '',
};

export const ITEM_UPDATED_DIALOG_DATA: DialogData = {
    title: 'Изменения успешно сохранены',
};

export interface DialogData {
    title: string;
    body?: string;
}

export const EMAIL_VALIDATOR_PATTERN =
    '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const MODAL_DIALOG_COMMON_WIDTH = '300px';

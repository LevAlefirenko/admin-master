import { IDataEntity } from './page-data.model';

export interface Admin {
    login: string;
    permissions: AdminPermissions;
    id: string;
}

export interface AdminPermissions {
    [key: string]: string;
}

export interface AdminListItem extends IDataEntity {
    login: string;
    permissions: AdminPermissions;
    id: string;
}

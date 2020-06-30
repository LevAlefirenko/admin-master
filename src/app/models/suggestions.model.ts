import { IDataEntity } from './page-data.model';

export interface Suggestion {
    title: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface SuggestionListItem extends IDataEntity {
    title: string;
    createdAt: string;
    updatedAt: string;
}

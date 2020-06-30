import { Observable } from 'rxjs';
import { DropdownOption } from './dropdown.model';
import { IDataEntity, IPageData } from './page-data.model';
import { IDataSourceRequestParams } from './request-params.model';

export abstract class DataService {
    abstract getData(
        params: IDataSourceRequestParams
    ): Observable<IPageData<IDataEntity>>;
}

export abstract class DropdownDataService {
    abstract getOptions(): Observable<DropdownOption[]>;
}

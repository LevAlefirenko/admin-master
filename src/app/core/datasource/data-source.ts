import { CollectionViewer, DataSource } from '@angular/cdk/typings/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {
    IDataEntity,
    DataService,
    IDataSourceRequestParams,
    IPageData,
} from '../../models';

@Injectable()
export class BaseDataSource implements DataSource<IDataEntity> {
    private dataSubject = new BehaviorSubject<IDataEntity[]>([]);
    private dataLengthSubject = new BehaviorSubject<number>(0);
    private httpRequestSubject = new Subject<IDataSourceRequestParams>();

    public dataLength$ = this.dataLengthSubject.asObservable();

    constructor(private dataService: DataService) {
        this.httpRequestSubject
            .pipe(
                switchMap(params => {
                    return this.dataService.getData(params).pipe(
                        catchError(() => {
                            return of({
                                records: [],
                                total: 0,
                            } as IPageData<IDataEntity>);
                        })
                    );
                })
            )
            .subscribe((pageData: IPageData<IDataEntity>) => {
                this.dataLengthSubject.next(pageData.total);
                return this.dataSubject.next(pageData.records);
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<IDataEntity[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.httpRequestSubject.complete();
        this.dataLengthSubject.complete();
        this.dataSubject.complete();
    }

    loadData(params: IDataSourceRequestParams) {
        this.httpRequestSubject.next(params);
    }
}

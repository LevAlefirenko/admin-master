import { Params, UrlSegment } from '@angular/router';

export interface RouterStateUrlModel {
    url: string;
    queryParams: Params;
    params: Params;
    data: any;
    urlSegments: UrlSegment[];
}

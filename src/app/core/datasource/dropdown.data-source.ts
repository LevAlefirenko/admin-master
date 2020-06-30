import { Observable } from 'rxjs';
import { DropdownDataService, DropdownOption } from '../../models';
import { Injectable } from '@angular/core';

@Injectable()
export class DropdownDataSource {
    constructor(private dataService: DropdownDataService) {}

    public loadOptions(): Observable<DropdownOption[]> {
        return this.dataService.getOptions();
    }
}

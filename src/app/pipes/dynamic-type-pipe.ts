import { CurrencyPipe, DatePipe } from '@angular/common';
import { Injector, Pipe, PipeTransform } from '@angular/core';
import { CURRENCY_CODE, DATE_FORMAT, TABLE_CELL_FORMATS } from '../constants';
import { PhonePipe } from './phone-number-pipe';

@Pipe({
    name: 'dynamicType',
})
export class DynamicTypePipe implements PipeTransform {
    public constructor(private injector: Injector) {}

    transform(value: any, cellType: any): any {
        switch (cellType) {
            case TABLE_CELL_FORMATS.DATE: {
                let datePipe = this.injector.get(DatePipe);
                return datePipe.transform(value, DATE_FORMAT);
            }
            case TABLE_CELL_FORMATS.PHONE: {
                let phonePipe = this.injector.get(PhonePipe);
                return phonePipe.transform(value);
            }
            case TABLE_CELL_FORMATS.CURRENCY: {
                let currencyPipe = this.injector.get(CurrencyPipe);
                return currencyPipe.transform(value, CURRENCY_CODE);
            }
            default:
                return value;
        }
    }
}

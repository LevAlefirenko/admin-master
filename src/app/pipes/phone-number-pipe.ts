import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneMask',
})
export class PhonePipe implements PipeTransform {
    transform(value: any): any {
        return value.replace(
            /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
            '$1 ($2) $3-$4-$5'
        );
    }
}

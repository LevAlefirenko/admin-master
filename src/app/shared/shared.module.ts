import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DynamicTypePipe, PhonePipe } from '../pipes';
import { ControlErrorModule } from '../components/control-error';
import { BubbleErrorModule } from '../components/bubble-error';
import { ImageModule } from '../components/image';

@NgModule({
    declarations: [DynamicTypePipe, PhonePipe],
    imports: [CommonModule, ControlErrorModule, BubbleErrorModule, ImageModule],
    exports: [
        CurrencyPipe,
        DatePipe,
        DynamicTypePipe,
        PhonePipe,
        ControlErrorModule,
        BubbleErrorModule,
        ImageModule,
    ],
    providers: [DatePipe, DynamicTypePipe, PhonePipe, CurrencyPipe],
})
export class SharedModule {}

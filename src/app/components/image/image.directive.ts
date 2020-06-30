import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

@Directive({
    selector: '[image]',
})
export class ImageDirective implements OnChanges {
    @Input()
    public imageSrc: string;

    @Input()
    public placeholderSrc: string;

    constructor(private elementRef: ElementRef) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.imageSrc) {
            this.checkSrcForDownload(this.imageSrc)
                .catch(() => {
                    return this.placeholderSrc;
                })
                .then(value => {
                    this.elementRef.nativeElement.src = value;
                });
        }
    }

    private checkSrcForDownload(src): Promise<string> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(src);
            };
            image.onerror = () => {
                reject();
            };
            image.src = src;
        });
    }
}

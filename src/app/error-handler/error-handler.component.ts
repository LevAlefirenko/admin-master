import { SubscriberComponent } from '../components/subscriber';

export class ErrorHandlerComponent extends SubscriberComponent {
    public errors: string[] = [];

    public clearErrors() {
        this.errors = [];
    }

    public handleErrors(err: any) {
        this.clearErrors();
        if (err.error) {
            if (Array.isArray(err.error.errors)) {
                this.errors = err.error.errors;
            } else {
                this.errors = [err.error];
            }
        }
    }
}

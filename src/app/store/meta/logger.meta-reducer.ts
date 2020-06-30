import { ActionReducer } from '@ngrx/store';

// console.log all actions
export function loggerMetaReducer(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return (state: any, action: any): any => {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

import { Actions, UPDATE_CURRENT_ADMIN } from './actions';
import { AdminState } from './interfaces';

export const initialState: AdminState = {
    data: null,
};

export default function(state = initialState, action: Actions): AdminState {
    switch (action.type) {
        case UPDATE_CURRENT_ADMIN:
            return { ...state, data: action.payload };
        default: {
            return state;
        }
    }
}

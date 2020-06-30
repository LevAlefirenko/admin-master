import {
    Actions,
    ADD_SERVER_ERROR,
    FINISH_LOADING,
    REMOVE_SERVER_ERROR,
    REMOVE_SERVER_ERRORS,
    START_LOADING,
} from './actions';
import { AppState, Loading } from './interfaces';

export const initialState: AppState = {
    loadings: [],
    serverErrors: [],
};

function getLoadingIndex(arr: Loading[], code: string): number {
    return arr.findIndex(element => {
        return element.code === code;
    });
}

export default function reducer(
    state = initialState,
    action: Actions
): AppState {
    switch (action.type) {
        case START_LOADING: {
            if (getLoadingIndex(state.loadings, action.payload.code) > -1) {
                return state;
            }
            return Object.assign({}, state, {
                loadings: state.loadings.concat(action.payload),
            });
        }
        case FINISH_LOADING: {
            const index = getLoadingIndex(state.loadings, action.payload);
            if (index > -1) {
                return {
                    ...state,
                    loadings: state.loadings.filter(
                        (loading, i) => i !== index
                    ),
                };
            }
            return state;
        }
        case ADD_SERVER_ERROR: {
            const index = state.serverErrors.indexOf(action.payload);
            if (index > -1) {
                return state;
            }
            return Object.assign({}, state, {
                serverErrors: state.serverErrors.concat(action.payload),
            });
        }
        case REMOVE_SERVER_ERROR: {
            const index = state.serverErrors.indexOf(action.payload);
            if (index > -1) {
                return {
                    ...state,
                    serverErrors: state.serverErrors.filter(
                        (errors, i) => i !== index
                    ),
                };
            }
            return state;
        }
        case REMOVE_SERVER_ERRORS: {
            return Object.assign({}, state, { serverErrors: [] });
        }

        default: {
            return state;
        }
    }
}

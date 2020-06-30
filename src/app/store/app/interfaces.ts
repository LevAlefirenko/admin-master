export interface Loading {
    code: string;
    global: boolean;
}

export interface AppState {
    loadings: Loading[];
    serverErrors: string[];
}

export interface LoginRequest {
    password: string;
    login: string;
}

export interface LoginResponse {
    refresh: string;
    refreshExpiredAt: number;
    token: string;
    tokenExpiredAt: number;
}

export interface TokenScheme {
    refreshToken: string;
    authToken: string;
}

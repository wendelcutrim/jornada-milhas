import { Injectable } from '@angular/core';

const KEY = '@jornada-milhas:token';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    saveToken(token: string) {
        localStorage.setItem(KEY, token);
    }

    destroyToken() {
        localStorage.removeItem(KEY);
    }

    getToken() {
        return localStorage.getItem(KEY) ?? '';
    }

    hasToken() {
        return !!this.getToken(); //!! transforma um valor em boolean
    }
}

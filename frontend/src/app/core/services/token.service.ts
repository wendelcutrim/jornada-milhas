import { Injectable } from '@angular/core';

const KEY = '@jornada-milhas:token';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    saveToken(token: string) {
        sessionStorage.setItem(KEY, token);
    }

    destroyToken() {
        sessionStorage.removeItem(KEY);
    }

    getToken() {
        return sessionStorage.getItem(KEY) ?? '';
    }

    hasToken() {
        return !!this.getToken(); //!! transforma um valor em boolean
    }
}

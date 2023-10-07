import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { PessoaUsuaria } from '../types/type';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

    constructor(private tokenService: TokenService) {
        if (this.tokenService.hasToken()) {
            this.decodeJwt();
        }
    }

    decodeJwt() {
        const token = this.tokenService.getToken();
        if (token) {
            const user = jwt_decode(token) as PessoaUsuaria;
            this.userSubject.next(user);
        }
    }

    returnUser() {
        return this.userSubject.asObservable();
    }

    saveToken(token: string) {
        this.tokenService.saveToken(token);
        this.decodeJwt();
    }

    logout() {
        this.tokenService.destroyToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }
}

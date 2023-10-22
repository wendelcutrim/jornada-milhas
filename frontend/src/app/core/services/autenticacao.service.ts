import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login, Token } from '../types/type';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AutenticacaoService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private userService: UserService) {}

    autenticar(props: Login): Observable<HttpResponse<Token>> {
        return this.http.post<Token>(`${this.apiUrl}/auth/login`, props, { observe: 'response' }).pipe(
            tap((res) => {
                const token = res.body?.access_token || '';
                this.userService.saveToken(token);
            }),
        );
    }
}

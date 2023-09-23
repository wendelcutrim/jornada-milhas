import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../types/type';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AutenticacaoService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    autenticar(props: Login): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, props);
    }
}

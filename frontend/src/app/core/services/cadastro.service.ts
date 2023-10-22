import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PessoaUsuaria } from '../types/type';

@Injectable({
    providedIn: 'root',
})
export class CadastroService {
    private apiUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) {}

    cadastrar(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
        return this.http.post<PessoaUsuaria>(`${this.apiUrl}/auth/cadastro`, pessoaUsuaria);
    }

    buscarCadasro(): Observable<PessoaUsuaria> {
        return this.http.get<PessoaUsuaria>(`${this.apiUrl}/auth/perfil`);
    }

    editarCadastro(data: PessoaUsuaria): Observable<PessoaUsuaria> {
        return this.http.patch<PessoaUsuaria>(`${this.apiUrl}/auth/perfil`, data);
    }
}

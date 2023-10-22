import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { FormService } from 'src/app/core/services/form.service';
import { TokenService } from 'src/app/core/services/token.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
    title: string = 'Olá pessoa';
    btnText: string = 'atualizar';
    token: string = '';
    _nome: string = '';
    cadastro!: PessoaUsuaria;
    form!: FormGroup<any> | null;

    private tokenService = inject(TokenService);
    private cadastroService = inject(CadastroService);
    private formService = inject(FormService);

    ngOnInit(): void {
        this.token = this.tokenService.getToken();
        this.cadastroService.buscarCadasro(this.token).subscribe({
            next: (res) => {
                this.cadastro = res;
                this._nome = res.nome;
                this.carregarFormulario();
            },
            error: (err) => console.error('[ERROR]: ', err),
        });
    }

    carregarFormulario() {
        const { nome, nascimento, cpf, telefone, email, senha, genero, cidade, estado } = this.cadastro;
        this.form = this.formService.getCadastro();
        this.form?.patchValue({
            nome,
            nascimento,
            cpf,
            telefone,
            email,
            senha,
            genero,
            cidade,
            estado,
        });
    }

    logout() {
        console.log('Logout realizado com sucesso!');
    }

    update() {
        console.log('Atualizar realizado com sucesso!');
    }

    get nome() {
        return `Olá ${this._nome}`;
    }
}

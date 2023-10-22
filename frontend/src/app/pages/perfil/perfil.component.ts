import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { FormService } from 'src/app/core/services/form.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
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
    nome = signal('');
    welcomeName = computed(() => `Olá ${this.nome()}`);
    cadastro!: PessoaUsuaria;
    form!: FormGroup<any> | null;

    private tokenService = inject(TokenService);
    private cadastroService = inject(CadastroService);
    private formService = inject(FormService);
    private router = inject(Router);
    private userService = inject(UserService);

    ngOnInit(): void {
        this.token = this.tokenService.getToken();
        this.cadastroService.buscarCadasro().subscribe({
            next: (res) => {
                this.cadastro = res;
                this.nome.set(res.nome);
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
        this.userService.logout();
        this.redirect('/login');
    }

    update() {
        console.log('Chamou atualizar');
        const dadosAtualizados: PessoaUsuaria = {
            nome: this.form?.value['nome'],
            nascimento: this.form?.value['nascimendo'],
            cpf: this.form?.value['cpf'],
            telefone: this.form?.value['telefone'],
            email: this.form?.value['email'],
            senha: this.form?.value['senha'],
            genero: this.form?.value['genero'],
            cidade: this.form?.value['cidade'],
            estado: this.form?.value['estado'],
        };

        console.log(this.form?.value);
        console.log(this.form?.valid);

        this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
            next: (res) => {
                console.log(res);
                alert('Dados atualizado com sucesso');
                this.redirect('/');
            },
        });
    }

    redirect(path: string) {
        this.router.navigate([path]);
    }
}

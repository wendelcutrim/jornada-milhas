import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormService } from 'src/app/core/services/form.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
    perfilComponent: boolean = false;
    private formService = inject(FormService);
    private cadastroService = inject(CadastroService);
    private router = inject(Router);

    onSubmit() {
        const form = this.formService.getCadastro();
        console.log('formService: ', form);

        if (form?.valid) {
            const novoCadastro = form.getRawValue() as PessoaUsuaria;
            console.log('novoCadastro: ', novoCadastro);
            this.cadastroService.cadastrar(novoCadastro).subscribe({
                next: (res) => {
                    console.log('cadastro realizado com sucesso', res);
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.error('[ERROR]: CadastroComponent.onSubmit', err);
                },
            });
        }
    }
}

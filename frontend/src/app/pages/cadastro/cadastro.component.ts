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
        console.log(form);

        if (form?.valid) {
            const novoCadstro = form.getRawValue() as PessoaUsuaria;
            this.cadastroService.cadastrar(novoCadstro).subscribe({
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

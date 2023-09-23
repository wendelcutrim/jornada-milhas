import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AutenticacaoService) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: [''],
        });
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const senha = this.loginForm.get('senha')?.value;

        this.authService.autenticar(this.loginForm.value).subscribe({
            next: (response) => {
                console.log('login realizado com sucesso', response);
            },
            error: (err) => console.error('[ERROR]: LoginComponent.login', err),
        });
    }
}

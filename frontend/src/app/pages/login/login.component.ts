import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { Login } from 'src/app/core/types/type';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AutenticacaoService, private router: Router) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: [''],
        });
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const senha = this.loginForm.get('password')?.value;

        const payload: Login = { email, senha };

        this.authService.autenticar(payload).subscribe({
            next: (response) => {
                console.log('login realizado com sucesso', response);
                this.loginForm.reset();
                this.router.navigate(['/']);
            },
            error: (err) => console.error('[ERROR]: LoginComponent.login', err),
        });
    }
}

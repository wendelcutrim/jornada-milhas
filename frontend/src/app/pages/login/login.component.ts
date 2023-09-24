import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATTERNS } from 'src/app/constants/pattern.constant';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    emailRegExp = PATTERNS.EMAIL;

    constructor(private formBuilder: FormBuilder, private authService: AutenticacaoService, private router: Router) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(this.emailRegExp)]],
            senha: [null, Validators.required],
        });
    }

    login() {
        this.authService.autenticar(this.loginForm.value).subscribe({
            next: (response) => {
                console.log('login realizado com sucesso', response);
                this.loginForm.reset();
                this.router.navigate(['/']);
            },
            error: (err) => console.error('[ERROR]: LoginComponent.login', err),
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PATTERNS } from 'src/app/constants/pattern.constant';
import { UnidadeFederativa } from 'src/app/core/types/type';

@Component({
    selector: 'app-form-user-base',
    templateUrl: './form-user-base.component.html',
    styleUrls: ['./form-user-base.component.scss'],
})
export class FormUserBaseComponent implements OnInit {
    cadastroForm!: FormGroup;
    estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required);
    emailRegexp = PATTERNS.EMAIL;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.cadastroForm = this.formBuilder.group({
            nome: [null, Validators.required],
            nascimento: [null, [Validators.required]],
            cpf: [null, [Validators.required]],
            cidade: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern(this.emailRegexp)]],
            senha: [null, [Validators.required, Validators.minLength(3)]],
            genero: [''],
            telefone: [null, Validators.required],
            estado: this.estadoControl,
            confirmarEmail: [null, [Validators.required, Validators.pattern(this.emailRegexp)]],
            confirmarSenha: [null, [Validators.required, Validators.minLength(3)]],
            aceitarTermos: [null, [Validators.requiredTrue]],
        });
    }

    submitForm() {
        console.log(this.cadastroForm.value);
    }
}

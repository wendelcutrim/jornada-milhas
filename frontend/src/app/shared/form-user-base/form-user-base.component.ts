import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PATTERNS } from 'src/app/constants/pattern.constant';
import { FormService } from 'src/app/core/services/form.service';
import { PessoaUsuaria, UnidadeFederativa } from 'src/app/core/types/type';
import { FormValidations } from '../validators/form-validator';

@Component({
    selector: 'app-form-user-base',
    templateUrl: './form-user-base.component.html',
    styleUrls: ['./form-user-base.component.scss'],
})
export class FormUserBaseComponent implements OnInit {
    @Input() perfilComponent!: boolean;
    @Input() title: string = 'Crie sua conta';
    @Input() btnText: string = 'cadastrar';
    @Output() formValue = new EventEmitter();
    @Output() logoutEvent = new EventEmitter();

    cadastroForm!: FormGroup;
    estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required);
    emailRegexp = PATTERNS.EMAIL;

    constructor(private formBuilder: FormBuilder, private formService: FormService) {}

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
            // confirmarEmail: [null, [Validators.required, Validators.pattern(this.emailRegexp)], FormValidations.equalsTo('email')],
            // confirmarSenha: [null, [Validators.required, Validators.minLength(3), FormValidations.equalsTo('senha')]],
            aceitarTermos: [null, [Validators.requiredTrue]],
        });

        if (this.perfilComponent) {
            this.cadastroForm.get('aceitarTermos')?.setValidators(null);
        } else {
            this.cadastroForm.get('aceitarTermos')?.setValidators(Validators.requiredTrue);
        }

        this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity();

        this.formService.setCadastro(this.cadastroForm);
    }

    submitForm() {
        console.log(this.cadastroForm.value);
        this.formValue.emit();
        // this.cadastroForm.reset();
        // this.cadastroForm.markAsPristine();
        // this.cadastroForm.markAsUntouched();
    }

    logout() {
        this.logoutEvent.emit();
    }
}

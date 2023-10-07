import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    cadastroForm: FormGroup | null = null;

    constructor() {}

    getCadastro() {
        return this.cadastroForm;
    }

    setCadastro(form: FormGroup) {
        this.cadastroForm = form;
    }
}

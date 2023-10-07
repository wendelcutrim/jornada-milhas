import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidations {
    static equalsTo(field: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const fieldValue = control.value;
            const otherFieldValue = control.root.get(field)?.value;

            if (fieldValue !== otherFieldValue) {
                return { equalsTo: true };
            }

            return null;

            /* const input = control.get(field);

            if (!input) {
                return null;
            }

            const valid = input.value === control.value;
            return !valid ? { equalsTo: { valid, value: control.value } } : null; */
        };
    }
}

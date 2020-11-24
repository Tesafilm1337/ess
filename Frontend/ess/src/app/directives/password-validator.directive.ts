import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[password]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]
})
export class PasswordValidatorDirective implements Validator {
  @Input() password;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    if (control.value === '' || control.value === null) {
      return null;
    }

    if (this.password === control.value) {
      return null;
    }
    return {
      password: { value: control.value }
    };
  }

}

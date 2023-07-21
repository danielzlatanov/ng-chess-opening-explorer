import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NgModel,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[compareWith]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ComparePassDirective,
      multi: true,
    },
  ],
})
export class ComparePassDirective implements Validator {
  @Input('compareWith') password!: NgModel;

  validate(control: AbstractControl): ValidationErrors | null {
    const repassValue = control.value;
    const passwordValue = this.password ? this.password.value : '';

    if (repassValue !== passwordValue) {
      return { passDontMatch: true };
    }

    return null;
  }
}

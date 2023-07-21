import { NgForm } from '@angular/forms';

export function trimFormFields(form: NgForm, trimEmailOnly?: boolean): void {
  Object.keys(form.controls).forEach((ctrlName) => {
    const control = form.controls[ctrlName];

    if (trimEmailOnly && ctrlName === 'email') {
      if (control.value && typeof control.value === 'string') {
        control.setValue(control.value.trimStart());
        control.setValue(control.value.trimEnd());
      }
      return;
    }

    if (control.value && typeof control.value === 'string') {
      control.setValue(control.value.trimStart());
      control.setValue(control.value.trimEnd());
    }
  });
}

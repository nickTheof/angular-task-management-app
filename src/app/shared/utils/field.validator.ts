import { AbstractControl, FormGroup } from '@angular/forms';

export function getError(
  form: FormGroup,
  controlName: string
): string | undefined {
  const control = form.get(controlName);
  if (control && control.touched && control.invalid) {
    if (control.errors?.['required']) return 'Αυτό το πεδίο είναι υποχρεωτικό';
    if (control.errors?.['pattern']) return 'Μη έγκυρη μορφή';
    if (control.errors?.['email']) return 'Μη έγκυρη μορφή email';
    if (control.hasError('minlength')) {
      const minlengthError = control.getError('minlength') as { requiredLength: number, actualLength: number };
      return `Το πεδίο πρέπει να περιλαμβάνει τουλάχιστον ${minlengthError.requiredLength} χαρακτήρες`;
    }
  }
  // Handle group-level (cross-field) validation errors
  if (
    controlName === 'confirmPassword' &&
    form.errors?.['valuesNotEqual'] &&
    control?.touched
  ) {
    return 'Οι κωδικοί δεν ταιριάζουν';
  }

  return undefined;
}

export function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;
    if (val1 === val2) {
      return null;
    } else {
      return { valuesNotEqual: true };
    }
  };
}

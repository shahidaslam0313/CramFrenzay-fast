import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const newPassword = AC.get('newPassword').value; // to get value in input tag
    const newPassword2 = AC.get('newPassword2').value; // to get value in input tag
    if (newPassword !== newPassword2) {
      AC.get('newPassword2').setErrors( {MatchPassword: true} );
    } else {
      return null;
    }
  }
}

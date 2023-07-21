import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { trimFormFields } from 'src/app/shared/helpers/trimFormFields';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showRequiredFieldsError = false;
  constructor(private authService: AuthService, private router: Router) {}

  async loginHandler(form: NgForm) {
    if (form.invalid) {
      this.showRequiredFieldsError = true;
      return;
    }

    const { email, password } = form.value;
    if (!email || !password) {
      return alert('All fields are required');
    }

    trimFormFields(form, true);
    
    try {
      await this.authService.login(email, password);
      this.router.navigate(['/openings/catalog']);
    } catch (err: any) {
      alert(err.message);
    }
  }
}

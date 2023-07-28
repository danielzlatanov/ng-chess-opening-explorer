import { NotificationService } from 'src/app/shared/services/notification/notification.service';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifService: NotificationService
  ) {}

  async loginHandler(form: NgForm) {
    if (form.invalid) {
      return this.notifService.showError(
        'Please fill in all fields or correct any errors.'
      );
    }

    const { email, password } = form.value;
    if (!email || !password) {
      return this.notifService.showError('All fields are required');
    }

    trimFormFields(form, true);

    try {
      await this.authService.login(email, password);
      this.router.navigate(['/openings/catalog']);
    } catch (err: any) {
      return this.notifService.showError(err.message);
    }
  }
}

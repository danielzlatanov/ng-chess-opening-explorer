import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { trimFormFields } from 'src/app/shared/helpers/trimFormFields';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifService: NotificationService
  ) {}

  async registerHandler(form: NgForm): Promise<void> {
    if (form.invalid) {
      return this.notifService.showError(
        'Please fill in all fields or correct any errors.'
      );
    }

    const { email, password, repass } = form.value;
    if (!email || !password) {
      return this.notifService.showError('All fields are required');
    }
    if (password.length < 6) {
      return this.notifService.showError(
        'Password should be at least 6 characters'
      );
    }
    if (password !== repass) {
      return this.notifService.showError('Passwords do not match');
    }

    trimFormFields(form, true);

    try {
      await this.authService.register(email, password);
      this.router.navigate(['/openings/catalog']);
    } catch (err: any) {
      return this.notifService.showError(err.message);
    }
  }
}

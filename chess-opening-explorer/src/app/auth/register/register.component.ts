import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  showRequiredFieldsError = false;
  constructor(private authService: AuthService, private router: Router) {}

  async registerHandler(form: NgForm) {
    if (form.invalid) {
      this.showRequiredFieldsError = true;
      return;
    }

    const { email, password, repass } = form.value;
    if (!email || !password) {
      return alert('All fields are required');
    }
    if (password.length < 6) {
      return alert('Password should be at least 6 characters');
    }
    if (password !== repass) {
      return alert('Passwords do not match');
    }

    try {
      await this.authService.register(email, password);
      this.router.navigate(['/openings/catalog']);
    } catch (err: any) {
      alert(err.message);
    }
  }
}

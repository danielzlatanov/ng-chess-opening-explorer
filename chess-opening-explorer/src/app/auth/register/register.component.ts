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
  constructor(private authService: AuthService, private router: Router) {}

  async registerHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password, repass } = form.value;
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
      if (err.code === 'auth/weak-password') {
        return alert(
          'Password is too weak. Please choose a stronger password.'
        );
      } else if (err.code == 'auth/invalid-email') {
        return alert('Email is invalid.');
      } else if (err.code == 'auth/email-already-in-use') {
        return alert('Email is already in use.');
      } else {
        return alert(
          'An error occurred during registration. Please try again later.'
        );
      }
    }
  }
}

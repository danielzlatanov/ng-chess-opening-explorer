import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async loginHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    try {
      await this.authService.login(email, password);
      this.router.navigate(['/openings/catalog']);
    } catch (err: any) {
      console.error(err.message);
    }
  }
}

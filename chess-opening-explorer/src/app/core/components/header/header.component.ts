import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log('Final user value', this.user);
    });
  }
}

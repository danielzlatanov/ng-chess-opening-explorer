import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  isUserSet = false;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isUserSet = true;
    });
  }
  ngOnInit(): void {
    this.isUserSet = false;
  }
}

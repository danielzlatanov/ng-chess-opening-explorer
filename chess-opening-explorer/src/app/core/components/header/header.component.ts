import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isUserSet = false;
  authServiceSub!: Subscription;

  constructor(private authService: AuthService) {
    this.authServiceSub = this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isUserSet = true;
    });
  }

  ngOnInit(): void {
    this.isUserSet = false;
  }

  ngOnDestroy(): void {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }
}

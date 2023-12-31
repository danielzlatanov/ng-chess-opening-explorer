import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {
  IconDefinition,
  faUser,
  faHome,
  faBook,
  faPlus,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isUserSet: boolean = false;
  authServiceSub!: Subscription;
  isMobileMenuOpen = false;
  faUser: IconDefinition = faUser;
  faHome: IconDefinition = faHome;
  faBook: IconDefinition = faBook;
  faPlus: IconDefinition = faPlus;
  faSignOutAlt: IconDefinition = faSignOutAlt;
  faSignInAlt: IconDefinition = faSignInAlt;
  faUserPlus: IconDefinition = faUserPlus;

  constructor(private authService: AuthService) {
    this.authServiceSub = this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isUserSet = true;
    });
  }

  ngOnInit(): void {
    this.isUserSet = false;
  }

  openMobileMenu() {
    this.isMobileMenuOpen = true;
  }

  handleCloseMobileMenu(value: boolean) {
    this.isMobileMenuOpen = value;
  }

  ngOnDestroy(): void {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }
}

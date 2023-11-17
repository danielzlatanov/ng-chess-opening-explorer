import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { User } from 'firebase/auth';
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
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  faUser: IconDefinition = faUser;
  faHome: IconDefinition = faHome;
  faBook: IconDefinition = faBook;
  faPlus: IconDefinition = faPlus;
  faSignOutAlt: IconDefinition = faSignOutAlt;
  faSignInAlt: IconDefinition = faSignInAlt;
  faUserPlus: IconDefinition = faUserPlus;
  @Input() user!: User | null;
  @Output() isMobileMenuOpenChange = new EventEmitter<boolean>();

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeMobileMenu();
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpenChange.emit(false);
  }
}

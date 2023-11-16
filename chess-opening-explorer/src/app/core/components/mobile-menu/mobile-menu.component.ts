import {
  Component,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  faUser: IconDefinition = faUser;
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

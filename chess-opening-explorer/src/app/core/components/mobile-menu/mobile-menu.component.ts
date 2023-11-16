import {
  Component,
  EventEmitter,
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

  closeMobileMenu() {
    this.isMobileMenuOpenChange.emit(false);
  }
}

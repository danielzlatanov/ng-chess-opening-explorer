import { Component } from '@angular/core';
import {
  faChessKnight,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  faUser = faUser;
  faChessKnight = faChessKnight;
  faStar = faStar;
}

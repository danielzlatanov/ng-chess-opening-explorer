import { Component } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-opening-details',
  templateUrl: './opening-details.component.html',
  styleUrls: ['./opening-details.component.scss'],
})
export class OpeningDetailsComponent {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
}

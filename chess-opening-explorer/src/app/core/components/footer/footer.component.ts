import { Component } from '@angular/core';
import {
  faLinkedin,
  faGithubSquare,
  faRedditSquare,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faLinkedin: IconDefinition = faLinkedin;
  faGithubSquare: IconDefinition = faGithubSquare;
  faRedditSquare: IconDefinition = faRedditSquare;
}

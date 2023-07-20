import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-openings-msg',
  templateUrl: './no-openings-msg.component.html',
  styleUrls: ['./no-openings-msg.component.scss'],
})
export class NoOpeningsMsgComponent {
  @Input() message!: string;
  @Input() imageUrl!: string;
  @Input() imageSize?: string;
  @Input() minHeight?: string;
}
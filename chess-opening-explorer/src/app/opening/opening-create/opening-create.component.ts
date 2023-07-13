import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { OpeningService } from '../opening.service';

@Component({
  selector: 'app-opening-create',
  templateUrl: './opening-create.component.html',
  styleUrls: ['./opening-create.component.scss'],
})
export class OpeningCreateComponent {
  constructor(private openingService: OpeningService) {}

  createOpening(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log('opening create component data... ', form.value);
  }
}

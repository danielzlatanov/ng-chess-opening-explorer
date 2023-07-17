import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { OpeningService } from '../opening.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opening-edit',
  templateUrl: './opening-edit.component.html',
  styleUrls: ['./opening-edit.component.scss'],
})
export class OpeningEditComponent implements OnInit {
  opening: IOpening | null = null;
  openingId!: string;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.openingId = this.route.snapshot.paramMap.get('id') as string;
    this.openingService
      .getOpeningById(this.openingId)
      .then((opening) => {
        this.opening = opening;
      })
      .catch((err) => {
        this.opening = null;
        console.error('Error fetching opening to edit: ', err.message);
      });
  }

  updateOpening(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log('editing form: ', form.value);
  }
}

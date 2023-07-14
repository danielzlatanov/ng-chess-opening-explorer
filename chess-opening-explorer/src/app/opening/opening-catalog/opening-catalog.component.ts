import { Component } from '@angular/core';
import { OpeningService } from '../opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';

@Component({
  selector: 'app-opening-catalog',
  templateUrl: './opening-catalog.component.html',
  styleUrls: ['./opening-catalog.component.scss'],
})
export class OpeningCatalogComponent {
  openings: IOpening[] | null = [];

  constructor(private openingService: OpeningService) {}

  ngOnInit(): void {
    this.openingService
      .getAllOpenings()
      .then((openings) => {
        this.openings = openings;
        // console.log('all openings received: ', this.openings);
        // this.changeDetectorRef.detectChanges();
      })
      .catch((err) => {
        this.openings = null;
        console.error('Error fetching all openings: ', err.message);
      });
  }
}

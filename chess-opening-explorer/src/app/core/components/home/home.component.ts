import { Component, OnInit } from '@angular/core';
import { OpeningService } from 'src/app/opening/opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  lastThreeOpenings: IOpening[] | null = [];

  constructor(private openingService: OpeningService) {}

  ngOnInit(): void {
    this.openingService
      .getLastThreeOpenings()
      .then((openings) => {
        this.lastThreeOpenings = openings;
        console.log('openings received: ', this.lastThreeOpenings);
      })
      .catch((err) => {
        this.lastThreeOpenings = null;
        console.error('Error fetching last three openings:', err.message);
      });
  }

  // ngOnInit(): void {
  //   this.openingService.getLastThreeOpenings().subscribe({
  //     next: (openings) => {
  //       this.lastThreeOpenings = openings;
  //       console.log('openings received: ', this.lastThreeOpenings);
  //     },
  //     error: (err) => {
  //       this.lastThreeOpenings = null;
  //       console.error('Error fetching last three openings:', err.message);
  //     },
  //   });
  // }
}

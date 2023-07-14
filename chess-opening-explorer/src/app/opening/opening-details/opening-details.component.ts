import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { OpeningService } from '../opening.service';
import { ActivatedRoute } from '@angular/router';
import { IOpening } from 'src/app/shared/interfaces/opening';

@Component({
  selector: 'app-opening-details',
  templateUrl: './opening-details.component.html',
  styleUrls: ['./opening-details.component.scss'],
})
export class OpeningDetailsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  openingId!: string;
  opening: IOpening | null = null;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.openingId = this.route.snapshot.paramMap.get('id') as string;
    this.fetchOpeningDetails();
  }

  fetchOpeningDetails(): void {
    this.openingService
      .getOpeningById(this.openingId)
      .then((opening) => {
        this.opening = opening;
      })
      .catch((err) => {
        this.opening = null;
        console.error('Error fetching current opening: ', err.message);
      });
  }
}

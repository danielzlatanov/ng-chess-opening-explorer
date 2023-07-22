import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { OpeningService } from 'src/app/opening/opening.service';
import { getRandomChessPiece } from 'src/app/shared/helpers/getRandomChessPieceImg';
import { IOpening } from 'src/app/shared/interfaces/opening';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  lastThreeOpenings: IOpening[] | null = [];
  getRandomChessPieceImg: Function = getRandomChessPiece;
  showNoOpeningsMsg = false;
  isLoading = true;

  constructor(
    private openingService: OpeningService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchLastThreeOpenings();
  }

  fetchLastThreeOpenings() {
    this.openingService
      .getLastThreeOpenings()
      .then((openings) => {
        this.lastThreeOpenings = openings;
        this.isLoading = false;
        this.showNoOpeningsMsg = this.lastThreeOpenings.length === 0;
        this.changeDetectorRef.detectChanges();
      })
      .catch((err) => {
        this.lastThreeOpenings = null;
        this.isLoading = false;
        console.error('Error fetching last three openings: ', err.message);
      });
  }
}

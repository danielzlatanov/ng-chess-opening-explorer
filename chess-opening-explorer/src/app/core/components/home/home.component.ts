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

  constructor(
    private openingService: OpeningService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.openingService
      .getLastThreeOpenings()
      .then((openings) => {
        this.lastThreeOpenings = openings;

        if (this.lastThreeOpenings.length === 0) {
          this.showNoOpeningsMsg = true;
        } else {
          this.showNoOpeningsMsg = false;
        }

        this.changeDetectorRef.detectChanges();
      })
      .catch((err) => {
        this.lastThreeOpenings = null;
        console.error('Error fetching last three openings: ', err.message);
      });
  }
}

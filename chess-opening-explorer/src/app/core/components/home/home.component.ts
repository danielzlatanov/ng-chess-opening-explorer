import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { OpeningService } from 'src/app/opening/opening.service';
import { getRandomChessPiece } from 'src/app/shared/helpers/getRandomChessPieceImg';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

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
    private changeDetectorRef: ChangeDetectorRef,
    private notifService: NotificationService,
    private router: Router
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
        this.router.navigate(['opening-not-found']);
        return this.notifService.showError(
          'Failed to load featured openings. Please try again later.'
        );
      });
  }
}

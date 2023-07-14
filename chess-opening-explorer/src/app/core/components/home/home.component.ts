import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { OpeningService } from 'src/app/opening/opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  lastThreeOpenings: IOpening[] | null = [];

  constructor(
    private openingService: OpeningService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.openingService
      .getLastThreeOpenings()
      .then((openings) => {
        this.lastThreeOpenings = openings;
        this.changeDetectorRef.detectChanges();
      })
      .catch((err) => {
        this.lastThreeOpenings = null;
        console.error('Error fetching last three openings:', err.message);
      });
  }

  getRandomChessPiece(): string {
    const chessPieces = [
      'bb.png',
      'bw.png',
      'kb.png',
      'kw.png',
      'nb.png',
      'nw.png',
      'pb.png',
      'pw.png',
      'qb.png',
      'qw.png',
      'rb.png',
      'rw.png',
    ];

    const randomIndex = Math.floor(Math.random() * chessPieces.length);
    const imgPath = `/assets/images/chess-pieces/${chessPieces[randomIndex]}`;
    return imgPath;
  }
}

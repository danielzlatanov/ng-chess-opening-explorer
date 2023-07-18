import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { OpeningService } from '../opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { getRandomChessPiece } from 'src/app/shared/helpers/getRandomChessPieceImg';

@Component({
  selector: 'app-opening-catalog',
  templateUrl: './opening-catalog.component.html',
  styleUrls: ['./opening-catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpeningCatalogComponent implements OnInit {
  getRandomChessPieceImg: Function = getRandomChessPiece;
  openings: IOpening[] | null = [];
  filteredOpenings: IOpening[] | null = [];
  searchQuery: string = '';

  constructor(
    private openingService: OpeningService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.openingService
      .getAllOpenings()
      .then((openings) => {
        this.openings = openings;
        this.filteredOpenings = openings;
        this.changeDetectorRef.detectChanges();
      })
      .catch((err) => {
        this.openings = null;
        console.error('Error fetching all openings: ', err.message);
      });
  }

  searchHandler(): void {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.filteredOpenings = this.openings;
    } else {
      if (this.openings) {
        this.filteredOpenings = this.openings?.filter((opening) =>
          opening.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  }
}

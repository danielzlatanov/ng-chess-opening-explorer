import { Component, OnInit } from '@angular/core';
import { OpeningService } from '../opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { getRandomChessPiece } from 'src/app/shared/helpers/getRandomChessPieceImg';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-opening-catalog',
  templateUrl: './opening-catalog.component.html',
  styleUrls: ['./opening-catalog.component.scss'],
})
export class OpeningCatalogComponent implements OnInit {
  randomChessPieceImgs: string[] = [];
  openings: IOpening[] | null = [];
  filteredOpenings: IOpening[] | null = [];
  searchQuery: string = '';
  isDynamicSearch = true;

  constructor(private openingService: OpeningService) {}

  ngOnInit(): void {
    this.openingService
      .getAllOpenings()
      .then((openings) => {
        this.openings = openings;
        this.filteredOpenings = openings;

        for (let i = 0; i < this.openings.length; i++) {
          this.randomChessPieceImgs[i] = getRandomChessPiece();
        }
      })
      .catch((err) => {
        this.openings = null;
        console.error('Error fetching all openings: ', err.message);
      });
  }

  toggleSearchMode() {
    this.isDynamicSearch = !this.isDynamicSearch;
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

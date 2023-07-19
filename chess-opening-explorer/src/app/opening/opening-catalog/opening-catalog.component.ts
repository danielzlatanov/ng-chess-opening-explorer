import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OpeningService } from '../opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { getRandomChessPiece } from 'src/app/shared/helpers/getRandomChessPieceImg';

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

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private openingService: OpeningService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['name'] || '';
      if (this.searchQuery.length > 0) {
        setTimeout(() => {
          this.searchInput.nativeElement.focus();
        });
      }
      this.fetchOpenings();
    });
  }

  fetchOpenings(): void {
    this.openingService
      .getAllOpenings()
      .then((openings) => {
        this.openings = openings;
        this.filteredOpenings = openings;
        this.searchHandler();

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
      this.router.navigate(['/openings/catalog']);
    } else {
      if (this.openings) {
        this.filteredOpenings = this.openings?.filter((opening) =>
          opening.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.router.navigate(['/openings/catalog/search'], {
          queryParams: { name: this.searchQuery },
        });
      }
    }
  }
}

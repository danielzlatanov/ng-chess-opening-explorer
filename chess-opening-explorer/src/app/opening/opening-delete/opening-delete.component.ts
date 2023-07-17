import { Component } from '@angular/core';
import { OpeningService } from '../opening.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-opening-delete',
  templateUrl: './opening-delete.component.html',
  styleUrls: ['./opening-delete.component.scss'],
})
export class OpeningDeleteComponent {
  openingId!: string;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.openingId = this.route.snapshot.paramMap.get('id') as string;
    this.openingService
      .deleteOpening(this.openingId)
      .then(() => {
        this.router.navigate(['/openings/catalog']);
      })
      .catch((err) => {
        console.error('Error deleting opening: ', err.message);
      });
  }
}

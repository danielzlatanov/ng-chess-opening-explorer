import { Component } from '@angular/core';
import { OpeningService } from '../opening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-opening-delete',
  templateUrl: './opening-delete.component.html',
  styleUrls: ['./opening-delete.component.scss'],
})
export class OpeningDeleteComponent {
  openingId!: string;
  redirectPath: string | undefined;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.openingId = this.route.snapshot.paramMap.get('id') as string;
    this.redirectPath = this.route.snapshot.queryParams['redirectPath'];

    this.openingService
      .deleteOpening(this.openingId)
      .then(() => {
        if (this.redirectPath) {
          this.notifService.showNotification('Opening removed successfully!');
          return this.router.navigate([this.redirectPath]);
        }
        this.notifService.showNotification('Opening removed successfully!');
        return this.router.navigate(['/openings/catalog']);
      })
      .catch((err) => {
        console.error('Error deleting opening: ', err.message);
      });
  }
}

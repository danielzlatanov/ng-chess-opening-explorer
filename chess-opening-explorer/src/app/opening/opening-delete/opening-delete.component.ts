import { Component, OnDestroy, OnInit } from '@angular/core';
import { OpeningService } from '../opening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-opening-delete',
  templateUrl: './opening-delete.component.html',
  styleUrls: ['./opening-delete.component.scss'],
})
export class OpeningDeleteComponent implements OnInit, OnDestroy {
  openingId!: string;
  redirectPath: string | undefined;
  user: User | null = null;
  authServiceSub!: Subscription;
  isOwner: boolean = false;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute,
    private router: Router,
    private notifService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.openingId = this.route.snapshot.paramMap.get('id') as string;

    this.authServiceSub = this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.openingService.getOpeningById(this.openingId).then((opening) => {
      this.isOwner = opening.ownerId == this.user?.uid;

      if (this.isOwner) {
        return this.deleteOpening();
      } else {
        return this.redirectNonOwner();
      }
    });
  }

  redirectNonOwner(): void {
    this.notifService.showNotification('You cannot delete this opening!');
    this.router.navigate(['/openings/details/' + this.openingId]);
  }

  deleteOpening(): void {
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
        return this.notifService.showError(
          'Failed to delete opening. Please try again.'
        );
      });
  }

  ngOnDestroy(): void {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }
}

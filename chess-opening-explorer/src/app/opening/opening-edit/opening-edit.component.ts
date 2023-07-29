import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { OpeningService } from '../opening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opening-edit',
  templateUrl: './opening-edit.component.html',
  styleUrls: ['./opening-edit.component.scss'],
})
export class OpeningEditComponent implements OnInit, OnDestroy {
  opening: IOpening | null = null;
  openingId!: string;
  showEditForm = true;
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
    this.authServiceSub = this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.showEditForm = true;
    this.openingId = this.route.snapshot.paramMap.get('id') as string;
    this.openingService
      .getOpeningById(this.openingId)
      .then((opening) => {
        this.opening = opening;
        this.isOwner = opening.ownerId == this.user?.uid;

        if (!this.isOwner) {
          this.router.navigate(['/openings/details/' + this.openingId]);
          this.notifService.showNotification(
            'You do not have permission over this opening!'
          );
        }
      })
      .catch((err) => {
        this.opening = null;
        console.error('Error fetching opening to edit: ', err.message);
        this.router.navigate(['opening-not-found']);
        return this.notifService.showError(
          'Failed to load opening. Please try again later.'
        );
      });
  }

  updateOpening(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.showEditForm = false;

    const { name, description, fen, level } = form.value;
    const updatedOpening: IOpening = {
      name,
      description,
      fen,
      level,
    };

    this.openingService
      .updateOpening(this.openingId, updatedOpening)
      .then(() => {
        this.router.navigate(['/openings/details/' + this.openingId]);
        this.notifService.showNotification('Opening updated successfully!');
      })
      .catch((err) => {
        this.showEditForm = true;
        console.error(
          'An error occurred while updating opening: ',
          err.message
        );
        return this.notifService.showError(
          'Failed to update opening. Please try again.'
        );
      });
  }

  ngOnDestroy(): void {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }
}

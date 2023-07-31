import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faChessKnight,
  faStar,
  faUser,
  faChessBoard,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { User } from 'firebase/auth';
import { OpeningService } from 'src/app/opening/opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  faUser: IconDefinition = faUser;
  faChessKnight: IconDefinition = faChessKnight;
  faChessBoard: IconDefinition = faChessBoard;
  faStar: IconDefinition = faStar;
  user: User | null = null;
  euTime: string | undefined = undefined;
  exploredOpenings: IOpening[] | [] = [];
  favOpenings: IOpening[] | [] = [];
  userOwnOpenings: IOpening[] | [] = [];
  isLoading: boolean = true;
  authServiceSub!: Subscription;

  constructor(
    private authService: AuthService,
    private openingService: OpeningService,
    private dialogService: ConfirmationDialogService,
    private notifService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.authServiceSub = this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isLoading = false;
      const creationTimeStr = this.user?.metadata.creationTime;
      const creationTime = creationTimeStr ? new Date(creationTimeStr) : null;

      this.euTime = creationTime?.toLocaleString('en-US', {
        timeZone: 'Europe/Sofia',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      this.retrieveExploredOpenings();
      this.retrieveFavouritedOpenings();
      this.retrieveUserOwnOpenings();
    });
  }

  retrieveExploredOpenings(): void {
    this.isLoading = true;

    if (this.user) {
      this.openingService
        .getUserExploredOpenings(this.user.email!)
        .then((openings) => {
          this.exploredOpenings = openings;
          this.isLoading = false;
        })
        .catch((err) => {
          this.exploredOpenings = [];
          this.isLoading = false;

          console.error('Error fetching explored openings: ', err.message);
          return this.notifService.showError(
            'An error occurred while loading your explored openings. Please try again later.'
          );
        });
    }
  }

  retrieveFavouritedOpenings(): void {
    this.isLoading = true;

    if (this.user) {
      this.openingService
        .getUserFavOpenings(this.user.email!)
        .then((openings) => {
          this.favOpenings = openings;
          this.isLoading = false;
        })
        .catch((err) => {
          this.favOpenings = [];
          this.isLoading = false;

          console.error('Error fetching favourited openings: ', err.message);
          return this.notifService.showError(
            'An error occurred while loading your favourited openings. Please try again later.'
          );
        });
    }
  }

  retrieveUserOwnOpenings(): void {
    this.isLoading = true;

    if (this.user) {
      this.openingService
        .getUserOwnOpenings(this.user.uid!)
        .then((openings) => {
          this.userOwnOpenings = openings;
          this.isLoading = false;
        })
        .catch((err) => {
          this.userOwnOpenings = [];
          this.isLoading = false;

          console.error("Error fetching user's own openings: ", err.message);
          return this.notifService.showError(
            'An error occurred while loading your own openings. Please try again later.'
          );
        });
    }
  }

  handleDeleteDialog(openingId: string): void {
    this.dialogService
      .openConfirmationDialog()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.router.navigate(['/openings/delete/' + openingId], {
            queryParams: { redirectPath: '/auth/profile' },
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }
}

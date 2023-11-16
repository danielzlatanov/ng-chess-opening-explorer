import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  IconDefinition,
  faArrowLeft,
  faArrowRight,
  faHeart,
  faHeartBroken,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { OpeningService } from '../opening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { ChessboardComponent } from 'src/app/shared/components/chessboard/chessboard.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'firebase/auth';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-opening-details',
  templateUrl: './opening-details.component.html',
  styleUrls: ['./opening-details.component.scss'],
})
export class OpeningDetailsComponent implements OnInit, OnDestroy {
  faArrowLeft: IconDefinition = faArrowLeft;
  faArrowRight: IconDefinition = faArrowRight;
  faHeart: IconDefinition = faHeart;
  faHeartBroken: IconDefinition = faHeartBroken;
  faInfoCircle: IconDefinition = faInfoCircle;
  openingId!: string;
  opening: IOpening | null = null;
  user: User | null = null;
  isOwner: boolean = false;
  isFavourite: boolean = true;
  isLoading: boolean = true;
  authServiceSub!: Subscription;

  @ViewChild('board', { static: false }) board!: ChessboardComponent;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dialogService: ConfirmationDialogService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.openingId = this.route.snapshot.paramMap.get('id') as string;
    this.fetchOpeningDetails();
    this.authServiceSub = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  fetchOpeningDetails(): void {
    this.openingService
      .getOpeningById(this.openingId)
      .then((opening) => {
        this.opening = opening;
        this.isOwner = opening.ownerId == this.user?.uid;
        this.isLoading = false;

        if (this.user && this.user.email && opening.id) {
          this.openingService
            .setOpeningAsExplored(opening.id, this.user.email)
            .catch((err) => {
              console.error('Error setting opening as explored: ', err.message);
            });

          this.openingService
            .checkFavouriteStatus(this.openingId, this.user.email)
            .then((isFavourite) => {
              this.isFavourite = isFavourite;
            })
            .catch((err) => {
              console.error('Error checking fav status: ', err.message);
            });
        }
      })
      .catch((err) => {
        this.opening = null;
        this.isLoading = false;
        console.error('Error fetching current opening: ', err.message);
        this.router.navigate(['opening-not-found']);
        return this.notifService.showError(
          'Failed to load current opening. Please try again later.'
        );
      });
  }

  favouriteOpening(): void {
    if (this.user && this.opening) {
      this.openingService
        .setOpeningAsFavourited(this.opening.id!, this.user.email!)
        .then(() => {
          this.isFavourite = true;
        })
        .catch((err) => {
          console.error('Error favouriting opening: ', err.message);
          return this.notifService.showError(
            'An error occurred while favouriting this opening. Please try again later.'
          );
        });
    }
  }

  unfavouriteOpening(): void {
    if (this.user && this.opening) {
      this.openingService
        .setOpeningAsUnfavourited(this.opening.id!, this.user.email!)
        .then(() => {
          this.isFavourite = false;
        })
        .catch((err) => {
          console.error('Error unfavouriting opening: ', err.message);
          return this.notifService.showError(
            'An error occurred while unfavouriting this opening. Please try again later.'
          );
        });
    }
  }

  handleDeleteDialog(): void {
    this.dialogService
      .openConfirmationDialog()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.router.navigate(['/openings/delete/' + this.openingId]);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }
}

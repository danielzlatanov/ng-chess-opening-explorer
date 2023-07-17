import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faHeart,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import { OpeningService } from '../opening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { ChessboardComponent } from 'src/app/shared/components/chessboard/chessboard.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'firebase/auth';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-opening-details',
  templateUrl: './opening-details.component.html',
  styleUrls: ['./opening-details.component.scss'],
})
export class OpeningDetailsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  openingId!: string;
  opening: IOpening | null = null;
  user: User | null = null;
  isOwner = false;
  isFavourite = true;

  @ViewChild('board', { static: false }) board!: ChessboardComponent;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.openingId = this.route.snapshot.paramMap.get('id') as string;
    this.fetchOpeningDetails();
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  fetchOpeningDetails(): void {
    this.openingService
      .getOpeningById(this.openingId)
      .then((opening) => {
        this.opening = opening;
        this.isOwner = opening.ownerId == this.user?.uid;

        if (this.user && this.user.email && opening.id) {
          this.openingService.setOpeningAsExplored(opening.id, this.user.email);

          this.openingService
            .checkFavouriteStatus(this.openingId, this.user.email)
            .then((isFavourite) => {
              this.isFavourite = isFavourite;
            })
            .catch((err) => {
              console.error('Error checking favorite status:', err.message);
            });
        }
      })
      .catch((err) => {
        this.opening = null;
        console.error('Error fetching current opening: ', err.message);
      });
  }

  favouriteOpening(): void {
    if (this.user && this.opening) {
      this.openingService.setOpeningAsFavourited(
        this.opening.id!,
        this.user.email!
      );
      this.isFavourite = true;
    }
  }

  unfavouriteOpening(): void {
    if (this.user && this.opening) {
      this.openingService.setOpeningAsUnfavourited(
        this.opening.id!,
        this.user.email!
      );
      this.isFavourite = false;
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
}

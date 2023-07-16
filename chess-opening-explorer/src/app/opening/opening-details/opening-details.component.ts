import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { OpeningService } from '../opening.service';
import { ActivatedRoute } from '@angular/router';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { ChessboardComponent } from 'src/app/shared/components/chessboard/chessboard.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-opening-details',
  templateUrl: './opening-details.component.html',
  styleUrls: ['./opening-details.component.scss'],
})
export class OpeningDetailsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  openingId!: string;
  opening: IOpening | null = null;
  user: User | null = null;
  isOwner = false;

  @ViewChild('board', { static: false }) board!: ChessboardComponent;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute,
    private authService: AuthService
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
        }
      })
      .catch((err) => {
        this.opening = null;
        console.error('Error fetching current opening: ', err.message);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  faChessKnight,
  faStar,
  faUser,
  faChessBoard,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { User } from 'firebase/auth';
import { OpeningService } from 'src/app/opening/opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  faUser = faUser;
  faChessKnight = faChessKnight;
  faChessBoard = faChessBoard;
  faStar = faStar;
  user: User | null = null;
  euTime: string | undefined = undefined;
  exploredOpenings: IOpening[] | [] = [];
  favOpenings: IOpening[] | [] = [];
  userOwnOpenings: IOpening[] | [] = [];

  constructor(
    private authService: AuthService,
    private openingService: OpeningService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
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
    if (this.user) {
      this.openingService
        .getUserExploredOpenings(this.user.email!)
        .then((openings) => {
          this.exploredOpenings = openings;
        })
        .catch((err) => {
          this.exploredOpenings = [];
          console.error('Error fetching explored openings: ', err.message);
        });
    }
  }

  retrieveFavouritedOpenings(): void {
    if (this.user) {
      this.openingService
        .getUserFavOpenings(this.user.email!)
        .then((openings) => {
          this.favOpenings = openings;
        })
        .catch((err) => {
          this.favOpenings = [];
          console.error('Error fetching favourited openings: ', err.message);
        });
    }
  }

  retrieveUserOwnOpenings(): void {
    if (this.user) {
      this.openingService
        .getUserOwnOpenings(this.user.uid!)
        .then((openings) => {
          this.userOwnOpenings = openings;
          console.log('fetched own: ', this.userOwnOpenings);
        })
        .catch((err) => {
          this.userOwnOpenings = [];
          console.error("Error fetching user's own openings: ", err.message);
        });
    }
  }
}

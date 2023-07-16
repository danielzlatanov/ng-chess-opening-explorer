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
    });
  }

  retrieveExploredOpenings() {
    if (this.user) {
      console.log('User email:', this.user?.email);
      this.openingService
        .getUserExploredOpenings(this.user.email!)
        .then((openings) => {
          this.exploredOpenings = openings;
          console.log('received explored openings: ', this.exploredOpenings);
        })
        .catch((err) => {
          this.exploredOpenings = [];
          console.error('Error fetching explored openings: ', err.message);
        });
    }
  }
}

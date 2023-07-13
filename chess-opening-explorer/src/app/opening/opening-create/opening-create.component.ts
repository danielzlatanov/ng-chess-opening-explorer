import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OpeningService } from '../opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';

@Component({
  selector: 'app-opening-create',
  templateUrl: './opening-create.component.html',
  styleUrls: ['./opening-create.component.scss'],
})
export class OpeningCreateComponent implements OnInit {
  userUid!: string; //!opening create cmp will be guarded later on

  constructor(
    private openingService: OpeningService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userUid = user.uid;
      }
    });
  }

  createOpening(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { name, description, fen, level } = form.value;
    const opening: IOpening = {
      name,
      description,
      fen,
      level,
      ownerId: this.userUid,
    };

    this.openingService
      .createOpening(opening)
      .then(() => {
        console.log('Opening created');
        this.router.navigate(['/openings/catalog']);
      })
      .catch((err) => {
        console.log('An error occurred while creating opening: ', err.message);
      });
  }
}

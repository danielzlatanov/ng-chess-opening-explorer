import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OpeningService } from '../opening.service';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-opening-create',
  templateUrl: './opening-create.component.html',
  styleUrls: ['./opening-create.component.scss'],
})
export class OpeningCreateComponent implements OnInit {
  userUid!: string; //!opening create cmp will be guarded later on
  userEmail!: string;
  showCreateForm = true;

  constructor(
    private openingService: OpeningService,
    private authService: AuthService,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.showCreateForm = true;
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userUid = user.uid;
        this.userEmail = user.email as string;
      }
    });
  }

  createOpening(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.showCreateForm = false;

    const { name, description, fen, level } = form.value;
    const opening: IOpening = {
      name,
      description,
      fen,
      level,
      ownerId: this.userUid,
      ownerEmail: this.userEmail,
    };

    this.openingService
      .createOpening(opening)
      .then(() => {
        this.router.navigate(['/openings/catalog']);
        this.notifService.showNotification('Opening added successfully!');
      })
      .catch((err) => {
        this.showCreateForm = true;
        console.error(
          'An error occurred while creating opening: ',
          err.message
        );
      });
  }
}

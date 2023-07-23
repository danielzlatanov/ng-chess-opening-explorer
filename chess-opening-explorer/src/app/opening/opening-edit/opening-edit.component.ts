import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IOpening } from 'src/app/shared/interfaces/opening';
import { OpeningService } from '../opening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-opening-edit',
  templateUrl: './opening-edit.component.html',
  styleUrls: ['./opening-edit.component.scss'],
})
export class OpeningEditComponent implements OnInit {
  opening: IOpening | null = null;
  openingId!: string;
  showEditForm = true;

  constructor(
    private openingService: OpeningService,
    private route: ActivatedRoute,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.showEditForm = true;
    this.openingId = this.route.snapshot.paramMap.get('id') as string;
    this.openingService
      .getOpeningById(this.openingId)
      .then((opening) => {
        this.opening = opening;
      })
      .catch((err) => {
        this.opening = null;
        console.error('Error fetching opening to edit: ', err.message);
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
      });
  }
}

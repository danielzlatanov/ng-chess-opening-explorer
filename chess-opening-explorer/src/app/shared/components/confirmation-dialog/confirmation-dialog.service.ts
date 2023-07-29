import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    return dialogRef.afterClosed().pipe(
      catchError((error) => {
        console.error(
          'Error occurred while closing confirmation dialog:',
          error
        );
        return of(false);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'left',
    });
  }

  showError(message: string): void {
    this.snackBar.openFromComponent(ErrorDialogComponent, {
      duration: 5000,
      verticalPosition: 'top',
      data: { message },
    });
  }
}

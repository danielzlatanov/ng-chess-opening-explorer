import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from './loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderRef!: MatDialogRef<LoaderComponent>;
  constructor(private dialog: MatDialog) {}

  showLoader() {
    this.loaderRef = this.dialog.open(LoaderComponent, {
      disableClose: true,
      panelClass: 'transparent-dialog',
    });
  }

  hideLoader() {
    if (this.loaderRef) {
      this.loaderRef.close();
    }
  }
}

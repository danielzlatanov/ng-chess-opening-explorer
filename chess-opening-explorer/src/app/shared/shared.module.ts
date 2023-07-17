import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEditorBaseComponent } from './components/form-editor-base/form-editor-base.component';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { LoaderComponent } from './loader/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    FormEditorBaseComponent,
    ChessboardComponent,
    LoaderComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxChessBoardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    FormEditorBaseComponent,
    ChessboardComponent,
    LoaderComponent,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule {}

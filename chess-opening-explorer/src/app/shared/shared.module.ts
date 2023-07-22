import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEditorBaseComponent } from './components/form-editor-base/form-editor-base.component';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NoOpeningsMsgComponent } from './components/no-openings-msg/no-openings-msg.component';
import { ComparePassDirective } from './directives/compare-pass.directive';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    FormEditorBaseComponent,
    ChessboardComponent,
    LoaderComponent,
    ConfirmationDialogComponent,
    NoOpeningsMsgComponent,
    ComparePassDirective,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxChessBoardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
  ],
  exports: [
    FormEditorBaseComponent,
    ChessboardComponent,
    LoaderComponent,
    ConfirmationDialogComponent,
    NoOpeningsMsgComponent,
    ComparePassDirective,
  ],
})
export class SharedModule {}

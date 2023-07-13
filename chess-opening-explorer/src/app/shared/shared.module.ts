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

@NgModule({
  declarations: [FormEditorBaseComponent, ChessboardComponent, LoaderComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxChessBoardModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  exports: [FormEditorBaseComponent, ChessboardComponent, LoaderComponent],
})
export class SharedModule {}

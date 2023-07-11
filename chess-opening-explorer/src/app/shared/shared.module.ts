import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEditorBaseComponent } from './components/form-editor-base/form-editor-base.component';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxChessBoardModule } from 'ngx-chess-board';

@NgModule({
  declarations: [FormEditorBaseComponent, ChessboardComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxChessBoardModule,
  ],
  exports: [FormEditorBaseComponent, ChessboardComponent],
})
export class SharedModule {}

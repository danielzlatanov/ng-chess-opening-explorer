import { Component, Input, ViewChild } from '@angular/core';
import { NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent {
  @Input() size!: number;

  @ViewChild('chessboard', { static: false }) chessboard!: NgxChessBoardView;

  resetBoardHandler(): void {
    this.chessboard.reset();
  }

  flipBoardHandler(): void {
    this.chessboard.reverse();
  }

  undoMoveHandler(): void {
    this.chessboard.undo();
  }
}

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent implements OnInit, OnChanges {
  @Input() size!: number;
  @Input() fen: string = '';

  @ViewChild('chessboard', { static: false }) chessboard!: NgxChessBoardView;

  ngOnInit(): void {
    setTimeout(() => {
      if (this.fen !== '' && this.chessboard) {
        this.setBoardFEN();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fen']) {
      if (this.fen !== '' && this.chessboard) {
        this.setBoardFEN();
      }
    }
  }

  resetBoardHandler(): void {
    this.chessboard.reset();
  }

  flipBoardHandler(): void {
    this.chessboard.reverse();
  }

  undoMoveHandler(): void {
    this.chessboard.undo();
  }

  setBoardFEN(): void {
    this.chessboard.setFEN(this.fen);
  }
}

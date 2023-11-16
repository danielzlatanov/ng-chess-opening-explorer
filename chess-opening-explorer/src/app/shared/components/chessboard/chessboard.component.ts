import {
  Component,
  HostListener,
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
  chessboardSize!: number;
  @Input() size!: number;
  @Input() fen: string = '';

  @ViewChild('chessboard', { static: false }) chessboard!: NgxChessBoardView;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateChessboardSize();
  }

  ngOnInit(): void {
    this.updateChessboardSize();
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

  updateChessboardSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 375) {
      this.chessboardSize = 250;
    } else if (screenWidth < 440) {
      this.chessboardSize = 300;
    } else if (screenWidth < 500) {
      this.chessboardSize = 350;
    } else if (screenWidth < 550) {
      this.chessboardSize = 400;
    } else if (screenWidth < 615) {
      this.chessboardSize = 450;
    } else if (screenWidth < 768) {
      this.chessboardSize = 500;
    } else if (screenWidth < 1024) {
      this.chessboardSize = 600;
    } else {
      this.chessboardSize = 600;
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

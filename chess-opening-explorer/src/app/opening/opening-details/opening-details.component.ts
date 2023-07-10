import { Component, ViewChild } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-opening-details',
  templateUrl: './opening-details.component.html',
  styleUrls: ['./opening-details.component.scss'],
})
export class OpeningDetailsComponent {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  @ViewChild('board', { static: false }) board!: NgxChessBoardView;

  constructor(private ngxChessBoardService: NgxChessBoardService) {}

  resetBoardHandler(): void {
    this.board.reset();
  }

  flipBoardHandler(): void {
    this.board.reverse();
  }

  undoMoveHandler(): void {
    this.board.undo();
  }
}

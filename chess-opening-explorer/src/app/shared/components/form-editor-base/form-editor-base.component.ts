import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { levels } from 'src/app/constants';
import { IOpening } from '../../interfaces/opening';
import { trimFormFields } from '../../helpers/trimFormFields';

@Component({
  selector: 'app-form-editor-base',
  templateUrl: './form-editor-base.component.html',
  styleUrls: ['./form-editor-base.component.scss'],
})
export class FormEditorBaseComponent implements OnInit, OnChanges {
  levels = levels;
  fenValue: string = '';
  fenPattern =
    /^((([pnbrqkPNBRQK1-8]{1,8})\/?){8})\s+(b|w)\s+(-|K?Q?k?q)\s+(-|[a-h][3-6])\s+(\d+)\s+(\d+)\s*$/gim;
  @Input() mode!: string;
  @Input() opening: IOpening | null = null;
  @Output() formSubmitted: EventEmitter<NgForm> = new EventEmitter<NgForm>();

  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['opening']) {
      this.isLoading = false;
    }
  }

  handleSubmit(form: NgForm) {
    trimFormFields(form);
    this.formSubmitted.emit(form);
  }

  showPositionOnBoard(fen: string) {
    this.fenValue = fen;
  }
}

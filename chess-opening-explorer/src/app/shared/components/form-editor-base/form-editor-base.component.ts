import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { levels } from 'src/app/constants';
import { IOpening } from '../../interfaces/opening';

@Component({
  selector: 'app-form-editor-base',
  templateUrl: './form-editor-base.component.html',
  styleUrls: ['./form-editor-base.component.scss'],
})
export class FormEditorBaseComponent {
  levels = levels;
  fenValue: string = '';
  fenPattern =
    /^((([pnbrqkPNBRQK1-8]{1,8})\/?){8})\s+(b|w)\s+(-|K?Q?k?q)\s+(-|[a-h][3-6])\s+(\d+)\s+(\d+)\s*$/gim;
  @Input() mode!: string;
  @Input() opening: IOpening | null = null;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  handleSubmit(form: NgForm) {
    Object.keys(form.controls).forEach((ctrl) => {
      const control = form.controls[ctrl];
      if (control.value && typeof control.value === 'string') {
        control.setValue(control.value.trimStart());
        control.setValue(control.value.trimEnd());
      }
    });

    this.formSubmitted.emit(form);
  }

  showPositionOnBoard(fen: string) {
    this.fenValue = fen;
  }
}

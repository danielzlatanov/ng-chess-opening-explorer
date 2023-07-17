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
  @Input() mode!: string;
  @Input() opening: IOpening | null = null;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  handleSubmit(form: NgForm) {
    this.formSubmitted.emit(form);
  }
}

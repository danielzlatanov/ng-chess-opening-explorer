import { Component } from '@angular/core';
import { levels } from 'src/app/constants';


@Component({
  selector: 'app-form-editor-base',
  templateUrl: './form-editor-base.component.html',
  styleUrls: ['./form-editor-base.component.scss']
})
export class FormEditorBaseComponent {
  levels = levels;

}

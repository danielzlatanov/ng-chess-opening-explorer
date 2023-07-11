import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditorBaseComponent } from './form-editor-base.component';

describe('FormEditorBaseComponent', () => {
  let component: FormEditorBaseComponent;
  let fixture: ComponentFixture<FormEditorBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditorBaseComponent]
    });
    fixture = TestBed.createComponent(FormEditorBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

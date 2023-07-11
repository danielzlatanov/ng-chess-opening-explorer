import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningEditComponent } from './opening-edit.component';

describe('OpeningEditComponent', () => {
  let component: OpeningEditComponent;
  let fixture: ComponentFixture<OpeningEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningEditComponent]
    });
    fixture = TestBed.createComponent(OpeningEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

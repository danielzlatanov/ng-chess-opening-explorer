import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningCreateComponent } from './opening-create.component';

describe('OpeningCreateComponent', () => {
  let component: OpeningCreateComponent;
  let fixture: ComponentFixture<OpeningCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningCreateComponent]
    });
    fixture = TestBed.createComponent(OpeningCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

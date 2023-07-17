import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningDeleteComponent } from './opening-delete.component';

describe('OpeningDeleteComponent', () => {
  let component: OpeningDeleteComponent;
  let fixture: ComponentFixture<OpeningDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningDeleteComponent]
    });
    fixture = TestBed.createComponent(OpeningDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningNotFoundComponent } from './opening-not-found.component';

describe('OpeningNotFoundComponent', () => {
  let component: OpeningNotFoundComponent;
  let fixture: ComponentFixture<OpeningNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningNotFoundComponent]
    });
    fixture = TestBed.createComponent(OpeningNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

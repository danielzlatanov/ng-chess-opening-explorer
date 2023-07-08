import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningListComponent } from './opening-list.component';

describe('OpeningListComponent', () => {
  let component: OpeningListComponent;
  let fixture: ComponentFixture<OpeningListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningListComponent]
    });
    fixture = TestBed.createComponent(OpeningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

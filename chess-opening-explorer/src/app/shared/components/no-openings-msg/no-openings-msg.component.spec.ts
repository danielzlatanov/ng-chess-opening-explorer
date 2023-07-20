import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOpeningsMsgComponent } from './no-openings-msg.component';

describe('NoOpeningsMsgComponent', () => {
  let component: NoOpeningsMsgComponent;
  let fixture: ComponentFixture<NoOpeningsMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoOpeningsMsgComponent]
    });
    fixture = TestBed.createComponent(NoOpeningsMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

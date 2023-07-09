import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningCatalogComponent } from './opening-catalog.component';

describe('OpeningCatalogComponent', () => {
  let component: OpeningCatalogComponent;
  let fixture: ComponentFixture<OpeningCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningCatalogComponent]
    });
    fixture = TestBed.createComponent(OpeningCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

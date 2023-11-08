import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTrainerComponent } from './page-trainer.component';

describe('PageTrainerComponent', () => {
  let component: PageTrainerComponent;
  let fixture: ComponentFixture<PageTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageTrainerComponent]
    });
    fixture = TestBed.createComponent(PageTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

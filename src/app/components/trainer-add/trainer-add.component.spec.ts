import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAddComponent } from './trainer-add.component';

describe('TrainerAddComponent', () => {
  let component: TrainerAddComponent;
  let fixture: ComponentFixture<TrainerAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerAddComponent]
    });
    fixture = TestBed.createComponent(TrainerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

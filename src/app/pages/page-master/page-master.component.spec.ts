import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMasterComponent } from './page-master.component';

describe('PageMasterComponent', () => {
  let component: PageMasterComponent;
  let fixture: ComponentFixture<PageMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageMasterComponent]
    });
    fixture = TestBed.createComponent(PageMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

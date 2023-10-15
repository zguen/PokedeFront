import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMasterComponent } from './profil-master.component';

describe('ProfilMasterComponent', () => {
  let component: ProfilMasterComponent;
  let fixture: ComponentFixture<ProfilMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilMasterComponent]
    });
    fixture = TestBed.createComponent(ProfilMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

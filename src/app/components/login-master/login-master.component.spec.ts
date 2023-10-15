import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMasterComponent } from './login-master.component';

describe('LoginMasterComponent', () => {
  let component: LoginMasterComponent;
  let fixture: ComponentFixture<LoginMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMasterComponent]
    });
    fixture = TestBed.createComponent(LoginMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

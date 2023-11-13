import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturedPokemonsComponent } from './captured-pokemons.component';

describe('CapturedPokemonsComponent', () => {
  let component: CapturedPokemonsComponent;
  let fixture: ComponentFixture<CapturedPokemonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapturedPokemonsComponent]
    });
    fixture = TestBed.createComponent(CapturedPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

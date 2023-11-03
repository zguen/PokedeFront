import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAddComponent } from './pokemon-add.component';

describe('PokemonAddComponent', () => {
  let component: PokemonAddComponent;
  let fixture: ComponentFixture<PokemonAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonAddComponent]
    });
    fixture = TestBed.createComponent(PokemonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

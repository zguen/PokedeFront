import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEditComponent } from './pokemon-edit.component';

describe('PokemonEditComponent', () => {
  let component: PokemonEditComponent;
  let fixture: ComponentFixture<PokemonEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonEditComponent]
    });
    fixture = TestBed.createComponent(PokemonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

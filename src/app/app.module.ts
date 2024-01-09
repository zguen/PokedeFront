import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AllPokemonsComponent } from './components/all-pokemons/all-pokemons.component';
import { FiltersComponent } from './components/filters/filters.component';
import { PageMasterComponent } from './pages/page-master/page-master.component';
import { LoginMasterComponent } from './components/login-master/login-master.component';
import { RegisterMasterComponent } from './components/register-master/register-master.component';
import { FormsModule } from '@angular/forms';
import { ProfilMasterComponent } from './components/profil-master/profil-master.component';
import { FooterComponent } from './components/footer/footer.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { CardTrainerComponent } from './components/card-trainer/card-trainer.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';
import { PokemonAddComponent } from './components/pokemon-add/pokemon-add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PageTrainerComponent } from './pages/page-trainer/page-trainer.component';
import { CapturedPokemonsComponent } from './components/captured-pokemons/captured-pokemons.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationMailComponent } from './pages/validation-mail/validation-mail.component';
import { BackButtonDirective } from './directives/back-button.directive';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    PokemonsComponent,
    CardComponent,
    NavbarComponent,
    AllPokemonsComponent,
    FiltersComponent,
    PageMasterComponent,
    LoginMasterComponent,
    RegisterMasterComponent,
    ProfilMasterComponent,
    FooterComponent,
    TrainerComponent,
    PokemonDetailsComponent,
    CardTrainerComponent,
    PokemonEditComponent,
    PokemonAddComponent,
    PageTrainerComponent,
    CapturedPokemonsComponent,
    NotFoundComponent,
    ValidationMailComponent,
    BackButtonDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, NgSelectModule, FormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

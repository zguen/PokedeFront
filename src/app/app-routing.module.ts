import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { LoginMasterComponent } from './components/login-master/login-master.component';
import { MasterComponent } from './pages/master/master.component';
import { RegisterMasterComponent } from './components/register-master/register-master.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'pokemons', component: PokemonsComponent },
  {path : 'pokemons/:pokedexid', component : PokemonDetailsComponent},
  { path: 'personal', component: PersonalComponent },
  { path: 'login', component: LoginMasterComponent },
  { path: 'master', component: MasterComponent },
  { path: 'master/register', component: RegisterMasterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

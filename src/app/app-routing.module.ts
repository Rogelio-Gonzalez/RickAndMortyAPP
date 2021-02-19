import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterComponent } from './pages/character/character.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProtectedGuard } from './guards/protected.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'characters', canActivate: [ProtectedGuard], component: CharactersComponent},
  {path : 'character/:id', canActivate: [ProtectedGuard], component: CharacterComponent},
  {path: 'favorites', canActivate: [ProtectedGuard], component : FavoritesComponent},
  {path: '**', pathMatch: 'full', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

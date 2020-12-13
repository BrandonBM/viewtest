import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'usuarios', loadChildren:() => import('./components/usuario/usuario.module').then(usuario => usuario.UsuarioModule)},
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

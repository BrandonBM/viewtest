import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { SharedModule } from '../shared/shared.module';
import { GlobalService } from '../../services/global.service';
import { EventosService } from '../../services/eventos.service';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';
import { BrowserModule } from '@angular/platform-browser';

export const routes: Routes = [
  { path: '', component: UsuarioListComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [UsuarioListComponent,UsuarioDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    
  ],
  providers: [GlobalService,EventosService],
  entryComponents:[UsuarioDialogComponent]
})
export class UsuarioModule { }

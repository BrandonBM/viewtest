import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/Usuario';
import { GlobalService } from '../../../services/global.service';
import { EventosService } from '../../../services/eventos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacionDialogComponent } from '../../shared/confirmacion-dialog/confirmacion-dialog.component';
import { UsuarioDialogComponent } from '../usuario-dialog/usuario-dialog.component';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  @ViewChild('tabla') tabla: MatTable<Usuario>;
  public displayedColumns = ['cedula', 'nombres', 'apellidos', 'correo', 'telefono', 'acciones'];
  usuarios: Usuario[] = [];

  constructor(
    private dialog: MatDialog,
    private gService: GlobalService,
    private eventos: EventosService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buscar();
    this.eventos.usuarioBusqueda.subscribe(() => console.log('emitida la busqueda'));
    this.eventos.usuarioCreacion.subscribe((data: any) => {
      console.log('creacion emitida');
      this.usuarios.push(data);
      this.tabla.renderRows();
    });
    this.eventos.usuarioActualizacion.subscribe((data: any) => {
      this.usuarios = this.usuarios.map((item: any) => {
        if (item.id === data.id) {
          item = Object.assign({}, item, data);
        }
        return item;
      });
      this.tabla.renderRows();
    });
  }


  buscar() {
    this.gService.getAll('usuario')
      .subscribe(
        (data: any[]) => {
          this.usuarios = data;
        },
        error => {
          const snackBarRef = this.snackBar.open(error, 'OK', { duration: 4500 });
          snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
          });
        });
  }

  usuarioDialog(id, editing) {
    const data = { editing: editing, id: id};
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(UsuarioDialogComponent, dialogConfig);
  }
  confirmarEliminacion(id) {
    this.gService.confirmDialog(`¿Seguro que desea borrar este Usuario?`)
      .afterClosed().subscribe(res => res ? this.eliminar(id) : null);
  }

  eliminar(id) {
    // console.log('elimina');
    // inicia spinner (despues de aceptar)
    this.gService.delete('usuario', id)
      .subscribe(
        (data: Usuario) => {
          // cierra spinner
          this.snackBar.open('El Usuario se ha eliminado correctamente', '', { duration: 4000 });
          this.usuarios = this.usuarios.filter((item) => item.id !== id);
          this.tabla.renderRows();
        },
        error => {
          // cierra spinner
          const snackBarRef = this.snackBar.open(error, 'ACEPTAR', { duration: 4000 });
          snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
          });
        }
      );
  }

}


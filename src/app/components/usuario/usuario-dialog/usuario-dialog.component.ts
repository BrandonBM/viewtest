import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/Usuario';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    cedula: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+')]),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl(0, Validators.pattern('^[0-9]+'))
  });

  usuario = new Usuario(null, '', '', '', null);
  usuarioTmp = new Usuario(null, '', '', '', null);


  constructor(private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gService: GlobalService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.data.editing ? this.buscar(this.data.id) : this.usuario.cedula = this.data.cedula;
    // tslint:disable-next-line:no-unused-expression
   // this.data.cedula ? this.usuario.cedula = this.data.cedula : null;
  }


  public buscar(id) {
    this.gService.getBy('usuario', id)
      .subscribe(
        (data: Usuario) => {
          this.usuario = data;
         this.usuarioTmp = Object.assign({} , data);
        },
        error => {
          const snackBarRef = this.snackBar.open(error, 'OK');
          snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
          });
        });
  }

  validCampo(campo: string, valor: any) {
   if (this.data.editing) {
    console.log(this.usuarioTmp);
    if (this.usuarioTmp[campo] == this.usuario[campo]) return null
    }
    this.gService.exists('usuario', campo, valor)
      .subscribe(
        (data: any[]) => {
          if (data) {
            this.usuario[campo] = null;
            this.snackBar.open(`El campo ${campo.toUpperCase()} ya existe`, '', { duration: 4000 });
          }
        },
        error => {
          const snackBarRef = this.snackBar.open(error, 'OK', { duration: 4500 });
          snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
          });
        });
  }

  public onSubmit() {
    // inicia spinner
    // console.log('crea');
    this.data.editing ? this.onUpdate() : this.onCreate();
  }

  public onCreate() {
    this.gService.save('usuario', this.usuario)
      .subscribe(
        (data: Usuario) => {
          // cierra spinner
          this.snackBar.open('El usuario se ha creado correctamente', '', { duration: 4000 });
          this.cerrar(data);
        },
        error => {
          // cierra spinner
          const snackBarRef = this.snackBar.open(`Error al crear Usuario: ${error}`, 'ACEPTAR', { duration: 4000 });
          snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
          });
        }
      );
  }

  public onUpdate() {
    this.gService.update('usuario', this.usuario)
      .subscribe(
        (data: Usuario) => {
          // cierra spinner
          this.snackBar.open('El Usuario se ha actualizado correctamente', '', { duration: 4000 });
          this.cerrar(data);
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

  public cerrar(data) {
    // reset formulario
    this.dialogRef.close(data);
  }
}

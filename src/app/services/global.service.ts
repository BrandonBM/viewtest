import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConstantService } from './constant.service';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EventosService } from './eventos.service';
import { ConfirmacionDialogComponent } from '../components/shared/confirmacion-dialog/confirmacion-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private headers;

  constructor(
    public http: HttpClient,
    private constant: ConstantService,
    private eventos: EventosService,
    private dialog: MatDialog,
  ) {
    this.create_headers();
  }
  private create_headers() {
    this.headers = new HttpHeaders();
    this.headers.set('Content-type', 'application/json');
    this.headers.set('Access-Control-Allow-Origin', '*');
  }

  getAll(module: string) {
    console.log(`getAll on Usuario`);
    this.create_headers();
    const url = `${this.constant.API_URL}/${module}/getAll`;
    return this.http.get(url, { headers: this.headers }).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError));
  }

  getBy(module: string, id: any) {
    console.log(`getBy on ${module}`);
    this.create_headers();
    const url = `${this.constant.API_URL}/${module}/getBy/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError));
  }

  exists(module: string, campo: string, id: any) {
    console.log(`getBy on ${module}`);
    this.create_headers();
    const url = `${this.constant.API_URL}/${module}/exists${campo}/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError));
  }

  save(module: string, object: any) {
    console.log('envío: ', object);
    this.create_headers();
    const url = `${this.constant.API_URL}/usuario/create`;
    object.usucrea = 0;
    return this.http.post(url, object, { headers: this.headers }).pipe(
      tap((data) => {
        console.log('recibo: ', data);
        this.eventos[`${module}Creacion`].emit(data);
      }),
      catchError(this.handleError)
    );
  }

  update(module: string, object: any) {
    console.log(`${module} enviado`, object);
    this.create_headers();
    const url = `${this.constant.API_URL}/usuario/update`;
    return this.http.put(url, object, { headers: this.headers }).pipe(
      tap((data) => {
        console.log(`${module} recibido`, object);
        this.eventos[`${module}Actualizacion`].emit(data);
      }),
      catchError(this.handleError)
    );
  }

  delete(module: string, id: any) {
    this.create_headers();
    const url = `${this.constant.API_URL}/${module}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      tap(() => this.eventos[`${module}Eliminacion`].emit()),
      catchError(this.handleError)
    );
  }


  confirmDialog(message) {
    return this.dialog.open(ConfirmacionDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {mensaje: message}
    });
  }


  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return observableThrowError(err.message);
  }


}

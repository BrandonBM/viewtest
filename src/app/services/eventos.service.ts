import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventosService {

  @Output() usuarioBusqueda: EventEmitter<any> = new EventEmitter<any>();
  @Output() usuarioCreacion: EventEmitter<any> = new EventEmitter<any>();
  @Output() usuarioActualizacion: EventEmitter<any> = new EventEmitter<any>();
  @Output() usuarioEliminacion: EventEmitter<any> = new EventEmitter<any>();
}

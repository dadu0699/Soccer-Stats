import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }

  /**
   * RETORNAR FECHA FORMATEADA
   */
  formatoFecha(fecha: string) {
    let fechaNueva = new Date(fecha);
    fechaNueva.setDate(fechaNueva.getDate() + 1)

    fechaNueva.toLocaleDateString('es-GT');
    return fechaNueva.toLocaleDateString();
  }
}

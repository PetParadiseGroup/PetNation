export class Events {
  _id: string;
  asistentes: string[];
  descripcion: string;
  fecha: string;
  nombre: string;
  organizador: string;
  ubicacion: string;

  constructor(
    _id: string,
    asistentes: string[],
    descripcion: string,
    fecha: string,
    nombre: string,
    organizador: string,
    ubicacion: string
  ) {
    this._id = _id;
    this.asistentes = asistentes;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.nombre = nombre;
    this.organizador = organizador;
    this.ubicacion = ubicacion;
  }
}

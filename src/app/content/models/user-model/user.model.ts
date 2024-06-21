export class User {
  _id: string;
  amigos: string[];
  correoElectronico: string;
  eventosAsistidos: string[];
  mascotas: Mascota[];
  nombre: string;
  publicaciones: string[];

  constructor(
    _id: string,
    amigos: string[],
    correoElectronico: string,
    eventosAsistidos: string[],
    mascotas: Mascota[],
    nombre: string,
    publicaciones: string[]
  ) {
    this._id = _id;
    this.amigos = amigos;
    this.correoElectronico = correoElectronico;
    this.eventosAsistidos = eventosAsistidos;
    this.mascotas = mascotas;
    this.nombre = nombre;
    this.publicaciones = publicaciones;
  }
}

export class Mascota {
  especie: string;
  nombre: string;
  raza: string;

  constructor(
    especie: string,
    nombre: string,
    raza: string
  ) {
    this.especie = especie;
    this.nombre = nombre;
    this.raza = raza;
  }
}

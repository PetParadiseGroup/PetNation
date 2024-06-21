export class Register {
  nombre: any;
  apellido_paterno: any;
  apellido_materno: any;
  correo: any;
  celular: any;
  direccion: any;
  contrasenia: any;

  constructor(nombre: any, apellido_paterno: any, apellido_materno: any, correo: any, celular: any, direccion: any, contrasenia: any) {
    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.correo = correo;
    this.celular = celular;
    this.direccion = direccion;
    this.contrasenia = contrasenia;
  }
}

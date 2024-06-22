export class Register {
  nombre: string;
  correoElectronico: string;
  contrasenia: string;

  constructor(nombre: string, correoElectronico: string, contrasenia: string) {
    this.nombre = nombre;
    this.correoElectronico = correoElectronico;
    this.contrasenia = contrasenia;
  }
}

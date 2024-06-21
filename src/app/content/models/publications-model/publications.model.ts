export class Publications {
  _id: string;
  comentarios: Comentario[];
  contenido: string;
  fecha_creacion: string;
  likes: string[];
  usuario_id: string;

  constructor(
    _id: string,
    comentarios: Comentario[],
    contenido: string,
    fecha_creacion: string,
    likes: string[],
    usuario_id: string
  ) {
    this._id = _id;
    this.comentarios = comentarios;
    this.contenido = contenido;
    this.fecha_creacion = fecha_creacion;
    this.likes = likes;
    this.usuario_id = usuario_id;
  }
}

export class Comentario {
  fecha_creacion: string; // Puedes manejar como string y convertir según necesites
  texto: string;
  usuario_id: string;

  constructor(
    fecha_creacion: string,
    texto: string,
    usuario_id: string
  ) {
    this.fecha_creacion = fecha_creacion;
    this.texto = texto;
    this.usuario_id = usuario_id;
  }
}

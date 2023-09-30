export class JugadorConectado {
  email: string;
  idSesion: string;
  partida: number;

  constructor(email: string, idSesion: string, partida: number) {
    this.idSesion = idSesion;
    this.email = email;
    this.partida = partida;
  }
}

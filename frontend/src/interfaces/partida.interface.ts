export interface IPartida {
  idPartida?: number;
  nombre: string;
  numeroLetras?: number;
  jugadores?: IJugador[];
}

export interface IJugador {
  email: string;
  idSesion: string;
}

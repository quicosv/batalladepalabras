export interface IPartida {
  idPartida?: number;
  nombre: string;
  numeroLetras?: number;
  jugadores?: IJugador[];
  palabra: string;
}

export interface IJugador {
  email: string;
  idSesion: string;
}

export interface IPartida {
  idPartida?: number;
  nombre: string;
  numeroLetras?: number;
  jugadores?: IJugador[];
  palabraActual: string;
}

export interface IJugador {
  email: string;
  idSesion: string;
}

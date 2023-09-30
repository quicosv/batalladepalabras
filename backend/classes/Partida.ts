import { IPalabraDeJugador } from '../interfaces/palabraDeJugador.interface';
import { JugadorConectado } from './jugadorConectado';

export class Partida {
  jugadores: JugadorConectado[];
  idPartida: number;
  nombre: string;
  numeroLetras: number;
  palabraActual: IPalabraDeJugador;

  constructor(idPartida: number, nombre: string, numeroLetras: number) {
    this.idPartida = idPartida;
    this.nombre = nombre;
    this.numeroLetras = numeroLetras;
    this.jugadores = [];
    this.palabraActual = { idSesion: '', palabra: '' };
  }

  esPartidaLlena(): boolean {
    return this.jugadores.length >= 2;
  }

  addJugador(jugador: JugadorConectado): void {
    if (!this.esPartidaLlena()) {
      if (!this.jugadores.find((x) => x.idSesion === jugador.idSesion)) {
        this.jugadores.push(jugador);
      }
    }
  }

  esPartidaVacia(): boolean {
    return this.jugadores.length === 0;
  }

  eliminarJugador(jugador: JugadorConectado): void {
    if (!this.esPartidaVacia()) {
      this.jugadores = this.jugadores.filter((x) => x.idSesion !== jugador.idSesion);
    }
  }
  esPartidaLibre(): boolean {
    return this.jugadores.length < 2;
  }
  addPalabraAJugador(palabra: string, jugador: JugadorConectado): void {
    if (this.jugadores.find((x) => x.idSesion === jugador.idSesion)) {
      this.palabraActual = { idSesion: jugador.idSesion, palabra: palabra };
    }
  }
  getPalabraDeJugador(jugador: JugadorConectado): string {
    if (this.jugadores.find((x) => x.idSesion === jugador.idSesion)) {
      return this.palabraActual.palabra;
    } else {
      return '';
    }
  }
}

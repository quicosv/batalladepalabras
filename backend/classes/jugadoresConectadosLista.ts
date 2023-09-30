import { JugadorConectado } from './jugadorConectado';

export class JugadoresConectadosLista {
  private jugadoresConectados: JugadorConectado[];
  constructor() {
    this.jugadoresConectados = [];
  }

  addJugador(email: string | undefined, idSesion: string, partida: number): void {
    if (email) {
      // const jugador = this.jugadoresConectados.find((x) => x.email === email);
      // if (jugador) {
      //   this.jugadoresConectados = this.jugadoresConectados.filter((x) => x.email !== email);
      // }

      const nuevoJugador = new JugadorConectado(email, idSesion, partida);
      this.jugadoresConectados.push(nuevoJugador);
    }
  }

  // addToPartida(email: string, partida: string): void {
  //   const jugador = this.jugadoresConectados.find((x) => x.email === email);
  //   if (jugador) {
  //     jugador.partida = partida;
  //   }
  // }

  removeJugador(idSesion: string): void {
    this.jugadoresConectados = this.jugadoresConectados.filter((x) => x.idSesion !== idSesion);
  }

  getJugadores(): JugadorConectado[] {
    return this.jugadoresConectados;
  }

  getPartidaJugador(idSesion: string): number {
    return this.jugadoresConectados.find((x) => x.idSesion === idSesion)!.partida;
  }

  // getJugadoresDePartida(partida: string): JugadorConectado[] {
  //   const jugadoresDePartida = this.jugadoresConectados.filter((x) => x.partida === partida);
  //   return jugadoresDePartida;
  // }

  // esPartidaCompleta(partida: string): boolean {
  //   const jugadoresDePartida = this.jugadoresConectados.filter((x) => x.partida === partida);
  //   return jugadoresDePartida.length >= 2;
  // }
}

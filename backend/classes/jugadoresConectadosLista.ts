import { JugadorConectado } from './jugadorConectado';

export class JugadoresConectadosLista {
  private jugadoresConectados: JugadorConectado[];
  constructor() {
    this.jugadoresConectados = [];
  }

  addJugador(email: string | undefined, idSesion: string): void {
    if (email) {
      const jugador = this.jugadoresConectados.find((x) => x.email === email);
      if (jugador) {
        this.jugadoresConectados = this.jugadoresConectados.filter((x) => x.email !== email);
      }

      const nuevoJugador = new JugadorConectado(email, idSesion);
      this.jugadoresConectados.push(nuevoJugador);
    }
  }

  addToSala(email: string, sala: string): void {
    const jugador = this.jugadoresConectados.find((x) => x.email === email);
    if (jugador) {
      jugador.sala = sala;
    }
  }

  removeJugador(idSesion: string): void {
    this.jugadoresConectados = this.jugadoresConectados.filter((x) => x.idSesion !== idSesion);
  }

  getJugadores(): JugadorConectado[] {
    return this.jugadoresConectados;
  }

  getSalaJugador(idSesion: string): string {
    return this.jugadoresConectados.find((x) => x.idSesion === idSesion)?.sala || '';
  }

  getJugadoresDeSala(sala: string): JugadorConectado[] {
    const jugadoresDeSala = this.jugadoresConectados.filter((x) => x.sala === sala);
    return jugadoresDeSala;
  }
}

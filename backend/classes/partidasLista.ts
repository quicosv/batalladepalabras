import { Partida } from './Partida';

export class partidasLista {
  private partidas: Partida[];
  constructor() {
    this.partidas = [];
  }
  addPartida(nombre: string, idSesion: string, email: string, numeroLetras: number, palabra:string): number {
    // La partida sólo se crea si el nombre no existe.
    if (!this.partidas.find((x) => x.nombre === nombre)) {
      const nPartida = this.partidas.length + 1;
      const nuevaPartida = new Partida(nPartida, nombre, numeroLetras,palabra);
      nuevaPartida.addJugador({ email, idSesion, partida: nPartida });
      this.partidas.push(nuevaPartida);
      return nPartida;
    }
    return 0;
  }

  eliminarPartida(id: number): void {
    this.partidas = this.partidas.filter((x) => x.idPartida !== id);
  }

  getPartidas(): Partida[] {
    return this.partidas;
  }

  getPartida(id: number): Partida {
    return this.partidas.find((x) => x.idPartida === id)!;
  }

  getPartidasConHuecos(): Partida[] {
    return this.partidas.filter((x) => x.esPartidaLibre());
  }
}

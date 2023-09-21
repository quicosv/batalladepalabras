import { Partida } from "./Partida";

export class partidasLista {
	private partidas: Partida[];
	constructor(){
this.partidas = [];
	}
	addPartida(id: number, nombre: string, numeroLetras: number): void {
		// La partida sólo se añade si viene un id
		if (id) {
			// Buscamos el id en la lista de patidas
			const partida = this.partidas.find((x) => x.idPartida === id);
			if (partida) {
				// Se crea un array nuevo con filter
				this.partidas = this.partidas.filter((x) => x.idPartida !== id);
			}
			// Se crea la partida
			const nuevaPartida = new Partida(id, nombre, numeroLetras);
			// Y se añade al array.
			this.partidas.push(nuevaPartida);
		}
	}
}
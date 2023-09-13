import { useEffect, useState } from "react"
import { h1Partida, tituloPartida } from "../../variables";

export const PartidaPage = () => {
	const [tuTurno, setTuTurno] = useState<boolean>(true);
	const palabra: string = 'gato';
	
	useEffect(() => {
		document.title = tituloPartida;
	})
	return (
		<>
		<h1>{h1Partida}</h1>
		{tuTurno ? (
			<form>
				<label htmlFor="letra">Letra</label>
				<input type="text" id="letra" value={letra} onChange={onInputChange} required />
				<button type="submit">Probar</button>
			</form>
		)
		: (<p>El turno pasa al otro jugador.</p>)}
		</>
	)
}
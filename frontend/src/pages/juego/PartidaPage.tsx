import { FormEvent, useEffect, useState } from "react"
import { h1Partida, tituloPartida } from "../../variables";
import { useForm } from "../../hooks/useForm";
import { ILetra } from "../../interfaces/letra.interface";

export const PartidaPage = () => {
	const [tuTurno, setTuTurno] = useState<boolean>(true);
	const [hasGanado, setHasGanado] = useState<boolean>(true);
	const palabra: string = 'gato';
	let descubierto: string = palabra.replace(/[a-zA-Z]/g, '_');
	const letrasProbadas: string[] = [];
	const { form, onInputChange, onResetForm } = useForm<ILetra>({
		letra: ''
	});

	const { letra } = form;

const actualizarDescubierto = (letra: string): string => {
	for (let i=0; i<palabra.length; i++){
		if (letra === palabra[i]) {
			descubierto = descubierto.substring(0,i) + letra + descubierto.substring(i+1);
		}
	}
	return descubierto;
}



	const pruebaLetra = (e: FormEvent) => {
		e.preventDefault();
		letrasProbadas.push(letra);
		if (palabra.includes(letra)) {
			actualizarDescubierto(letra);
			if (descubierto === palabra) {
				setHasGanado(true);
			}
		}
		else {
			setTuTurno(false);
		}
		onResetForm();
	}
	useEffect(() => {
		document.title = tituloPartida;
	})
	return (
		<>
			<h1>{h1Partida}</h1>
			{tuTurno ? (
				<>
				<form onSubmit={pruebaLetra}>
					<label htmlFor="letra">Letra</label>
					<input type="text" maxLength={1} pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{1}" id="letra" value={letra} onChange={onInputChange} required />
					<button type="submit">Probar</button>
				</form>
				<h2>Estado de la palabra</h2>
				<ol>
					{
						[...descubierto].map(x=>(
							<li>
						{x === '_' ? 'Desconocido.' : x}
						</li>
						))
					}
					{/* {
					for (let i = 0; i <= descubierto.length; i++) {
						<li>
						{descubierto[i] === '_' ? ('Desconocido.') : (descubierto[i])}
						</li>
					}
					} */}
				</ol>
				{hasGanado && (<p>Has ganado.</p>)}
</>
			)
				: (<p>El turno pasa al otro jugador.</p>)}
		</>
	)
}
import { FormEvent, useEffect, useState } from "react"
import { h1Partida, tituloPartida } from "../../variables";
import { useForm } from "../../hooks/useForm";
import { ILetra } from "../../interfaces/letra.interface";

export const PartidaPage = () => {
	const [tuTurno, setTuTurno] = useState<boolean>(true);
	const [hasGanado, setHasGanado] = useState<boolean>(false);
	const palabra: string = 'gato';
	let descubierto: string = palabra.replace(/[a-zA-Z]/g, '_');
	const letrasProbadas: string[] = [];
	const { form, onInputChange, onResetForm } = useForm<ILetra>({
		letra: ''
	});

	const { letra } = form;

const actualizarDescubierto = (letra: string): void => {
	for (let i=0; i<palabra.length; i++){
		if (letra === palabra[i]) {
			descubierto = descubierto.substring(0,i) + letra + descubierto.substring(i+1);
		}
	}
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
				<p>{descubierto}</p>
				<ol>
					{
						[...descubierto].map((x,i) => (
						<li key={i}>x === '_' ? 'Desconocida.' : `${x}.`</li>
						))
					}

				</ol>
				{hasGanado && (<p>Has ganado.</p>)}
</>
			)
				: (<p>El turno pasa al otro jugador.</p>)}
		</>
	)
}
import { FormEvent, useEffect, useState } from "react"
import { h1Partida, tituloPartida } from "../../variables";
import { useForm } from "../../hooks/useForm";
import { ILetra } from "../../interfaces/letra.interface";

export const PartidaPage = () => {
	const [tuTurno, setTuTurno] = useState<boolean>(true);
	const palabra: string = 'gato';
	const letrasProbadas: string[] = [];
	const letrasAcertadas: string[] = [];
	const { form, onInputChange, onResetForm } = useForm<ILetra>({
		letra: ''
	});

	const { letra } = form;

	const pruebaLetra = (e: FormEvent) => {
		e.preventDefault();
		letrasProbadas.push(letra);
		if (palabra.includes(letra)) {
			letrasAcertadas.push(letra);
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
				<form onSubmit={pruebaLetra}>
					<label htmlFor="letra">Letra</label>
					<input type="text" maxLength={1} pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{1}" id="letra" value={letra} onChange={onInputChange} required />
					<button type="submit">Probar</button>
				</form>
			)
				: (<p>El turno pasa al otro jugador.</p>)}
		</>
	)
}
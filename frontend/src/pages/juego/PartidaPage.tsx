import { FormEvent, useEffect, useState } from "react"
import { h1Partida, tituloPartida } from "../../variables";
import { useForm } from "../../hooks/useForm";
import { ILetra } from "../../interfaces/letra.interface";

export const PartidaPage = () => {
	const [tuTurno, setTuTurno] = useState<boolean>(true);
	const palabra: string = 'perrera';
	const [descubierto, setDescubierto] = useState<string>(palabra.replace(/[a-zA-Z]/g, '_'));
	const letrasProbadas: string[] = [];
	const { form, onInputChange, onResetForm } = useForm<ILetra>({
		letra: ''
	});

	const { letra } = form;

	const actualizarDescubierto = (letra: string): void => {
		const procesarPalabra: string[] = [...palabra];
		const procesarDescubierto: string[] = [...descubierto];
		console.log('Array original.');
		console.log(procesarDescubierto);
		procesarDescubierto.map((x) => (
			procesarPalabra.forEach((y) => {
				if (letra === y) {
					x = letra;
				}
			})
		))
		console.log('Array modificado por la letra ' + letra + '.');
		console.log(procesarDescubierto);
		setDescubierto('');
		procesarDescubierto.forEach(x => setDescubierto(descubierto + x));
	}

	const pruebaLetra = (e: FormEvent) => {
		e.preventDefault();
		letrasProbadas.push(letra);
		if (palabra.includes(letra)) {
			actualizarDescubierto(letra);
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
					<p aria-hidden="true">{descubierto}</p>
					<ol className="oculto-visualmente">
						{
							[...descubierto].map((x, i) => (
								<li key={i}>{x === '_' ? 'Desconocida.' : `${x}.`}</li>
							))
						}

					</ol>
					{descubierto === palabra && (<p>Has ganado.</p>)}
				</>
			)
				: (<p>El turno pasa al otro jugador.</p>)}
		</>
	)
}
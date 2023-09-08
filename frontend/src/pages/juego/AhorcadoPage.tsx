import React, { useState, useEffect, useRef } from 'react';
import { h1Partida, tituloPartida } from '../../variables';

interface AhorcadoProps {
	palabraProporcionada: string;
}

export const AhorcadoPage: React.FC<AhorcadoProps> = ({ palabraProporcionada }) => {
	const [letrasPorAdivinar, setLetrasPorAdivinar] = useState<string>('');
	const [letra, setLetra] = useState<string>('');
	const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
	const [intentosRestantes, setIntentosRestantes] = useState<number>(6);
	const [mensaje, setMensaje] = useState<string>('');

	useEffect(() => {
		setLetrasPorAdivinar(palabraProporcionada.replace(/[a-zA-Z]/g, '_'));
	}, [palabraProporcionada]);

	useEffect(() => {
		if (letrasPorAdivinar === palabraProporcionada && palabraProporcionada !== '') {
			setMensaje('Felicidades, la palabra adivinada es ' + palabraProporcionada);
		}
	}, [letrasPorAdivinar, palabraProporcionada]);

	const adivinarLetra = () => {
		if (letrasAdivinadas.includes(letra)) {
			setMensaje('Ya has probado con esta letra');
			return;
		}

		setLetrasAdivinadas([...letrasAdivinadas, letra]);

		let correcto = false;
		let nuevaPalabra = letrasPorAdivinar;

		for (let i = 0; i < palabraProporcionada.length; i++) {
			if (letra === palabraProporcionada[i]) {
				correcto = true;
				nuevaPalabra = nuevaPalabra.substring(0, i) + letra + nuevaPalabra.substring(i + 1);
				setMensaje('Letra correcta');
			}
		}

		setLetrasPorAdivinar(nuevaPalabra);

		if (!correcto) {
			setMensaje('Letra incorrecta');
			setIntentosRestantes(intentosRestantes - 1);
			if (intentosRestantes === 0) {
				setMensaje(`Perdiste: la palabra era ${palabraProporcionada}`);
			}
		}

		setLetra('');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMensaje('');
		setLetra(event.currentTarget.value.trim());
	};

	useEffect(() => {
		document.title = tituloPartida;
	}, []);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	},[]);
	return (
		<>
			<h1 ref={h1Ref} tabIndex={-1}>{h1Partida}</h1>
			<hr />
			<p>{letrasPorAdivinar}</p>

			<form>
				<div className="form-group">
					<label htmlFor="letra">Introduce una letra</label>
					<input id="letra" type="text" className="form-control" value={letra} onChange={handleChange} />
				</div>
				<button
					className="btn btn-success"
					type="button"
					onClick={adivinarLetra}
					disabled={letra.trim() === '' || letra.length !== 1}
				>
					Adivinar
				</button>
				<p>Intentos restantes: {intentosRestantes}</p>
				<p>Letras utilizadas: {letrasAdivinadas.join(', ')}</p>
			</form>
			{mensaje && (
				<div className="alert alert-danger" role="alert">
					{mensaje}
				</div>
			)}
		</>
	);
};
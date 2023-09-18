import { FormEvent, useEffect, useRef, useState } from "react"
import { h1Partida, tituloPartida } from "../../variables";
import { useForm } from "../../hooks/useForm";
import { ILetra } from "../../interfaces/letra.interface";
import { esAcentuada, letraSinAcentos, palabraSinAcentos } from "../../hooks/useLetra";

export const PartidaPage = () => {
	const [tuTurno, setTuTurno] = useState<boolean>(true);
	const palabra: string = 'perrería';
	const [descubierto, setDescubierto] = useState<string>(palabra.replace(/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '_'));
	const [letrasProbadas, setLetrasProbadas] = useState<string[]>([]);
	const { form, onInputChange, onResetForm } = useForm<ILetra>({
		letraInput: ''
	});

	const { letraInput } = form;

	const actualizarDescubierto = (letra: string): void => {
		// Desestructuramos los strings para convertirlos en arrays
		const procesarPalabra: string[] = [...palabra];
		const procesarDescubierto: string[] = [...descubierto];
		// Este array almacenará los índices de las coincidencias
		const indices: number[] = [];
		// Se crea un array original de strings para almacenar lo que hay en descubierto y poder procesarlo como un verdadero array
		const caracteres: string[] = [];
		// Copiamos el contenido de lo descubierto en el array de caracteres
		for (let i = 0; i < procesarDescubierto.length; i++) {
			caracteres.push(procesarDescubierto[i]);
		}
		// Recorremos el array de descubierto y el de la palabra original y almacenamos en el array de índices la posición en la que coincide una letra
		for (let i = 0; i < procesarDescubierto.length; i++) {
			for (let j = 0; j < procesarPalabra.length; j++) {
				if (esAcentuada(letra) || esAcentuada(palabra[j].toLowerCase())) {
					if (letraSinAcentos(letra) === letraSinAcentos(palabra[j])) {
						indices.push(j);
					}
				}
				else {
					if (letra === palabra[j]) {
						indices.push(j);
					}
				}
			}
		}
		// Recorriendo el array de índices se hacen las sustituciones
		indices.forEach(x => {
			caracteres[x] = palabra[x];
		})
		// Con la función join actualizamos la cadena de lo que se ha descubierto con el array de caracteres
		setDescubierto(caracteres.join(''));
	}

	const pruebaLetra = (e: FormEvent) => {
		e.preventDefault();
		const letra = letraInput.toLocaleLowerCase();
		setLetrasProbadas([...letrasProbadas, letra.toLocaleLowerCase()]);
		if (palabraSinAcentos(palabra).includes(letra) || palabra.includes(letra)) {
			actualizarDescubierto(letra);
		}
		else {
			setTuTurno(false);
		}
		onResetForm();
	}
	useEffect(() => {
		document.title = tituloPartida;
	},[]);
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	},[]);
	return (
		<>
			<h1>{h1Partida}</h1>
			{tuTurno ? (
				<>
					<form onSubmit={pruebaLetra}>
						<label htmlFor="letra">Letra</label>
						<input type="text" maxLength={1} pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{1}" id="letraInput" value={letraInput} onChange={onInputChange} ref={inputRef} required />
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
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { h1Partida, tituloPartida } from "../../variables";
import { useForm } from "../../hooks/useForm";
import { ILetra } from "../../interfaces/letra.interface";
import {
	esAcentuada,
	letraSinAcentos,
	palabraSinAcentos,
} from "../../hooks/useLetra";
import { useParams } from "react-router-dom";
import { IJugadorInfoContext } from "../../interfaces/context.interface";
import { AppContext } from "../../context/AppContext";
import { IPartida } from "../../interfaces/partida.interface";

export const PartidaPage = () => {
	const { jugadorInfo } = useContext<IJugadorInfoContext>(AppContext);
	const [contrincante, setContrincante] = useState<string>("");
	const [hayGanador, setHayGanador] = useState<boolean>(true);
	const [palabra, setPalabra] = useState<string>("");
	const [descubierto, setDescubierto] = useState<string>(
		palabra.replace(/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, "_")
	);
	const [letrasProbadas, setLetrasProbadas] = useState<string[]>([]);
	const { form, onInputChange, onResetForm } = useForm<ILetra>({
		letraInput: "",
	});
	const { socket } = jugadorInfo;
	const { nombre } = useParams();

	const { letraInput } = form;

	socket?.on("comienza-juego", (partida: IPartida) => {
		console.log("partida iniciada", partida);
		setContrincante(partida.jugadores![1].email);
		setPalabra(partida.palabra);
	});

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
				} else {
					if (letra === palabra[j]) {
						indices.push(j);
					}
				}
			}
		}
		// Recorriendo el array de índices se hacen las sustituciones
		indices.forEach((x) => {
			caracteres[x] = palabra[x];
		});
		// Con la función join actualizamos la cadena de lo que se ha descubierto con el array de caracteres
		setDescubierto(caracteres.join(""));
	};

	const pruebaLetra = (e: FormEvent) => {
		e.preventDefault();
		const letra = letraInput.toLocaleLowerCase();
		setLetrasProbadas([...letrasProbadas, letra.toLocaleLowerCase()]);
		if (palabraSinAcentos(palabra).includes(letra) || palabra.includes(letra)) {
			actualizarDescubierto(letra);
		} else {
			setHayGanador(false);
		}
		onResetForm();
	};

	useEffect(() => {
		document.title = tituloPartida;
		socket?.emit("crear-partida", {
			nombre,
			numeroLetras:0,
			email: jugadorInfo.email,
		});
	}, []);

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);
	return (
		<>
			<h1>{h1Partida}</h1>
			<p>
				{contrincante === ""
					? "Esperando a tu oponente"
					: "Tu oponente es: " + contrincante}
			</p>
			{contrincante!== "" && !hayGanador ? (
				<>
					<form className="row g-3" onSubmit={pruebaLetra}>
						<div className="form-group">
							<label className="form-label" htmlFor="letra">
								Letra
							</label>
							<input
								className="form-control"
								type="text"
								maxLength={1}
								pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{1}"
								id="letraInput"
								value={letraInput}
								onChange={onInputChange}
								ref={inputRef}
								required
							/>
						</div>
						<button className="btn btn-success btn-lg" type="submit">
							Probar
						</button>
					</form>
					<h2>Estado de la palabra</h2>
					<p aria-hidden="true">{descubierto}</p>
					<ol className="oculto-visualmente">
						{[...descubierto].map((x, i) => (
							<li key={i}>{x === "_" ? "Desconocida." : `${x}.`}</li>
						))}
					</ol>
					{descubierto === palabra && <p>Has ganado.</p>}
				</>
			) : (
				<p>El turno pasa al otro jugador.</p>
			)}
		</>
	);
};

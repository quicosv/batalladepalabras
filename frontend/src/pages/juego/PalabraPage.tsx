import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { h1Palabra, tituloPalabra } from "../../variables";
import { useForm } from "../../hooks/useForm";
import { AppContext } from "../../context/AppContext";
import { IJugadorInfoContext } from "../../interfaces/context.interface";
import { ITuPalabra } from "../../interfaces/tuPalabra.interface";
import { clienteAxios } from "../../config/clienteAxios";
import { handlerAxiosError } from "../../helpers/handlerAxiosError";

interface IPalabraFormProps {
	idPartida: number;
	palabra: string;
}

export const PalabraPage = ({ idPartida, palabra }: IPalabraFormProps) => {
	const { jugadorInfo } = useContext<IJugadorInfoContext>(AppContext);

	const [errorMsg, setErrorMsg] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const { form, onInputChange, onResetForm } = useForm<ITuPalabra>({
		jugadores_email: jugadorInfo.email,
		tuPalabra: "",
		partidas_idPartida: idPartida,
	});

	const { jugadores_email, tuPalabra, partidas_idPartida } = form;

	const procesaPalabra = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			setErrorMsg("");
			await clienteAxios.post<ITuPalabra>("/palabra", {
				jugadores_email,
				tuPalabra,
				partidas_idPartida,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}

		onResetForm();
	};

	useEffect(() => {
		document.title = tituloPalabra;
	}, []);
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);
	return (
		<>
			<h1>{h1Palabra}</h1>
			<form className="row g-3" onSubmit={procesaPalabra}>
				<div className="form-group">
					<label className="form-label" htmlFor="palabra">Introduce una palabra:</label>
					<input
					className="form-control"
						type="text"
						maxLength={23}
						pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{1,23}"
						id="palabra"
						value={tuPalabra}
						onChange={onInputChange}
						ref={inputRef}
						required
					/>
				</div>
				<button className="btn btn-success btn-lg" type="submit">Enviar</button>
			</form>
			{loading && (
				<div className="alert alert-warning" role="alert">
					Enviando palabra...
				</div>
			)}
			{/* Si errorFetch es true, mostramos un mensaje de error al usuario */}
			{errorMsg && !loading && (
				<div className="alert alert-danger" role="alert">
					{errorMsg}
				</div>
			)}
		</>
	);
};

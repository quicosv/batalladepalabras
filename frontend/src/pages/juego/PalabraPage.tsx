import { FormEvent, useEffect, useRef } from "react";
import { h1Palabra, tituloPalabra } from "../../variables";
import { useForm } from "../../hooks/useForm";
import { IPalabra } from "../../interfaces/palabra.interface";

export const PalabraPage = () => {
	const { form, onInputChange, onResetForm } = useForm<IPalabra>({
		palabra: ''
	});

	const { palabra } = form;


	const procesaPalabra = (e: FormEvent) => {
		e.preventDefault();
		onResetForm();
	}

	useEffect(() => {
		document.title = tituloPalabra;
	},[]);
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	},[]);
	return (
		<>
			<h1>{h1Palabra}</h1>
			<form onSubmit={procesaPalabra}>
				<label htmlFor="palabra">Introduce una palabra:</label>
				<input
					type="text"
					maxLength={23}
					pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{1,23}"
					id="palabra"
					value={palabra}
					onChange={onInputChange}
					ref={inputRef}
					required
				/>
				<button type="submit">Enviar</button>
			</form>
		</>
	);
};

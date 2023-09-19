import { FormEvent, useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { IPartida } from '../../interfaces/partida.interface';
import { clienteAxios } from '../../config/clienteAxios';
import { h1CrearPartida } from '../../variables';

interface IPartidasFormProps {
	setRefreshPartidas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PartidasForm = ({ setRefreshPartidas: setRefreshPartidas }: IPartidasFormProps) => {
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [ok, setOk] = useState<boolean>(true);
	const { form, onInputChange, onResetForm } = useForm<IPartida>({
		nombre: '',
		numeroLetras: 1
	});

	const { nombre, numeroLetras } = form;

	const crearPartida = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);
			setErrorMsg('');
			await clienteAxios.post<IPartida>('/partidas', { nombre, numeroLetras });
			onResetForm();
			setOk(true);
			setLoading(false);
			setRefreshPartidas(true);
		} catch (error) {
			setOk(false);
			setLoading(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};
	
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	},[]);
	
	return (
		<>
			<h1>{h1CrearPartida}</h1>

			<form onSubmit={crearPartida}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre de la partida</label>
					<input id="nombre" type="text" className="form-control" value={nombre} onChange={onInputChange} ref={inputRef} required />
					<label htmlFor="numeroLetras">Número de letras</label>
<input id="numeroLetras" type="number" min={1} max={23} step={1} title='Número de letras que tendrá la palabra con la que vas a jugar' value={numeroLetras} required />
				</div>
				<button className="btn btn-primary" type="submit">
					Crear partida
				</button>
			</form>
			{loading && (
				<div className="alert alert-warning" role="alert">
					Creando partida ...
				</div>
			)}
			{!ok && errorMsg && !loading && (
				<div className="alert alert-danger" role="alert">
					{errorMsg}
				</div>
			)}
		</>
	);
};

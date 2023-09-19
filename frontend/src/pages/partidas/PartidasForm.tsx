import { FormEvent, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { IPartida } from '../../interfaces/partida.interface';
import { clienteAxios } from '../../config/clienteAxios';

interface IPartidasFormProps {
	setRefreshPartidas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PartidasForm = ({ setRefreshPartidas: setRefreshPartidas }: IPartidasFormProps) => {
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [ok, setOk] = useState<boolean>(true);
	const { form, onInputChange, onResetForm } = useForm<IPartida>({
		nombre: '',
		numeroLetras: 0
	});

	const { nombre } = form;

	const crearPartida = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);
			setErrorMsg('');
			await clienteAxios.post<IPartida>('/Partidas', { nombre });
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

	return (
		<>
			<h1>Crear partida</h1>

			<form onSubmit={crearPartida}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre de la partida</label>
					<input id="nombre" type="text" className="form-control" value={nombre} onChange={onInputChange} required />
					<label htmlFor="numeroLetras">Número de letras</label>
<input id="numeroLetras" type="number" min={1} max={23} step={1} required/>
				</div>
				<button className="btn btn-primary" type="submit" disabled={nombre.trim() === ''}>
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

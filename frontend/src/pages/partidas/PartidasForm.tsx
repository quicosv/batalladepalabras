import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { IPartida } from '../../interfaces/partida.interface';
import { clienteAxios } from '../../config/clienteAxios';
import { h1CrearPartida } from '../../variables';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { IJugadorInfoContext } from '../../interfaces/context.interface';

interface IPartidasFormProps {
	setRefreshPartidas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PartidasForm = ({ setRefreshPartidas: setRefreshPartidas }: IPartidasFormProps) => {
	const { jugadorInfo: jugadorInfo } = useContext<IJugadorInfoContext>(AppContext);
	const { socket } = jugadorInfo;
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const [ok, setOk] = useState<boolean>(true);
	const { form, onInputChange, onResetForm } = useForm<IPartida>({
		nombre: '',
		numeroLetras: 1
	});

	const { nombre, numeroLetras } = form;

	const crearPartida = async (e: FormEvent) => {
		e.preventDefault();
socket?.emit('crear-partida', {nombre, numeroLetras});
navigate("/palabra", {
	replace: true,
});
/* 		try {
			setLoading(true);
			setErrorMsg('');
			await clienteAxios.post<IPartida>('/partidas', { nombre, numeroLetras });
			onResetForm();
			setOk(true);
			setLoading(false);
			navigate("/palabra", {
				replace: true,
			});
		} catch (error) {
			setOk(false);
			setLoading(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		} */
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

			<form className='row g-3' onSubmit={crearPartida}>
				<div className="form-group">
					<label className='form-label' htmlFor="nombre">Nombre de la partida</label>
					<input id="nombre" type="text" className="form-control" value={nombre} onChange={onInputChange} ref={inputRef} required />
					</div>
					<div className="form-group">
						<label className='form-label' htmlFor="numeroLetras">Número de letras</label>
						<input className='form-control' id="numeroLetras" type="number" min={1} max={23} step={1} title='Número de letras que tendrá la palabra con la que vas a jugar' onChange={onInputChange} value={numeroLetras} required />
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

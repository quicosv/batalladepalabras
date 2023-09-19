import { useEffect, useState } from 'react';
import { IPartida } from '../../interfaces/partida.interface';
import { clienteAxios } from '../../config/clienteAxios';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { useNavigate } from 'react-router-dom';

interface IPartidasListProps {
	setRefreshPartidas: React.Dispatch<React.SetStateAction<boolean>>;
	refreshPartidas: boolean;
}

export const PartidasList = ({ refreshPartidas: refreshPartidas, setRefreshPartidas: setRefreshPartidas }: IPartidasListProps) => {
	const navigate = useNavigate();
	const [partidas, setPartidas] = useState<IPartida[]>([]);
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [ok, setOk] = useState<boolean>(true);

	useEffect(() => {
		if (refreshPartidas) {
			getPartidas();
		}
	}, [refreshPartidas]);

	const getPartidas = async () => {
		try {
			setLoading(true);
			setErrorMsg('');
			const { data } = await clienteAxios.get<IPartida[]>('/partidas');
			setPartidas(data);
			setRefreshPartidas(false);
			setLoading(false);
			setOk(true);
		} catch (error) {
			setRefreshPartidas(false);
			setOk(false);
			setLoading(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};

	const goToPartida = async (partida: IPartida) => {
		const url = `/partida/${partida.idPartida}/${partida.nombre}`;
		navigate(url);
	};
	
	return (
		<>
			{partidas?.length > 0 && (
				<>
					<h2>Total partidas: {partidas.length}</h2>
					<table className="table">
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{partidas.map((x) => (
								<tr key={x.idPartida}>
									<td>{x.nombre}</td>
									<td>
										<button className="btn btn-info" onClick={() => goToPartida(x)}>
											Entrar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
			{refreshPartidas && loading && (
				<div className="alert alert-warning" role="status" aria-live="polite">
					Actualizando partidas...
				</div>
			)}
			{!ok && errorMsg && !refreshPartidas && (
				<div className="alert alert-danger" role="status" aria-live="polite">
					{errorMsg}
				</div>
			)}
		</>
	);
};

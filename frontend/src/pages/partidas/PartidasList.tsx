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
const numeros = [1,2,3,4,5,6,7,8,9,0,11,12,13,14,15,16,17,18,19,20,21,22,23];
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

const buscaPartidas = (cantidadDeLetras: number): boolean => {
	let hayPartidas = false;
for (const partida of partidas) {
	if (partida.numeroLetras === cantidadDeLetras) {
		hayPartidas = true;
	}
}
	return hayPartidas;
}

	const goToPartida = async (partida: IPartida) => {
		const url = `/partida/${partida.idPartida}/${partida.nombre}`;
		navigate(url);
	};
	
	return (
		<>
			{partidas?.length > 0 && (
				numeros.map((numero) => (
					buscaPartidas(numero) && (
						<>
							<h2>Partidas de : {numero} : letras</h2>
							<ul>
								{partidas.filter(partida => partida.numeroLetras === numero).map((x) => (
									<li key={x.idPartida}>
										{x.nombre} :
										<button className="btn btn-info" onClick={() => goToPartida(x)}>
											Entrar
										</button>
									</li>
								))}
							</ul>
						</>
					)
				))
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

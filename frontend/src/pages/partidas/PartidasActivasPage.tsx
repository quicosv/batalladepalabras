import { useState } from 'react';
import { UsersConnectedList } from '../../components/JugadoresConnectedList';
import { PartidasList } from './PartidasList';
import { Link } from 'react-router-dom';

export const PartidasActivasPage = () => {
	const [refreshPartidas, setRefreshPartidas] = useState<boolean>(true);

	return (
		<>
			<div className="row">
				<div className="col">
					<PartidasList refreshPartidas={refreshPartidas} setRefreshPartidas={setRefreshPartidas} />
				</div>
				<p>
				¿Quieres jugar? <Link to="/crearpartida">Crea una partida</Link>
			</p>
				<div className="col">{<UsersConnectedList />}</div>
			</div>
		</>
	);
};

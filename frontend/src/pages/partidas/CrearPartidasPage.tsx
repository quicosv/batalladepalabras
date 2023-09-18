import { useState } from 'react';
import { UsersConnectedList } from '../../components/JugadoresConnectedList';
import { PartidasForm } from './PartidasForm';

export const CrearPartidasPage = () => {
	const [refreshPartidas, setRefreshPartidas] = useState<boolean>(true);

	return (
		<>
			<div className="row">
				<div className="col">
					<PartidasForm setRefreshPartidas={setRefreshPartidas} />
				</div>
				
				<div className="col">{<UsersConnectedList />}</div>
			</div>
		</>
	);
};

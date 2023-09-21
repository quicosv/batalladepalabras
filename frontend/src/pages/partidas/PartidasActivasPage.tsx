import { useEffect, useRef, useState } from 'react';
import { UsersConnectedList } from '../../components/JugadoresConnectedList';
import { PartidasList } from './PartidasList';
import { Link } from 'react-router-dom';
import { h1PartidasActivas, tituloPartidasActivas } from '../../variables';

export const PartidasActivasPage = () => {
	useEffect(() => {
		document.title = tituloPartidasActivas;
	}, []);

	const [refreshPartidas, setRefreshPartidas] = useState<boolean>(true);

	const h1Ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	},[]);
	
	return (
		<>
					<h1 ref={h1Ref} tabIndex={-1}>
				{h1PartidasActivas}</h1>

			<div className="row">
				<div className="col">
					<PartidasList refreshPartidas={refreshPartidas} setRefreshPartidas={setRefreshPartidas} />
				</div>
				<Link to="/crearpartida">También puedes crear tu partida</Link>
				<div className="col">{<UsersConnectedList />}</div>
			</div>
		</>
	);
};

import React, { useState, useEffect } from 'react';

interface PalabrasProporcionadasProps {
	children: (palabraProporcionada: string) => React.ReactNode;
}

export const PalabrasProporcionadas: React.FC<PalabrasProporcionadasProps> = ({ children }) => {
	// Simula obtener la palabra de la base de datos MySQL
	const [palabraProporcionada, setPalabraProporcionada] = useState('');

	useEffect(() => {
		// Simula una llamada a la base de datos para obtener la palabra
		// En este caso, simplemente asignamos una palabra de ejemplo
		setPalabraProporcionada('gato');
	}, []);

	return <>{children(palabraProporcionada)}</>;
};

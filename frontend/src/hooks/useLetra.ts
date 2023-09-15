export const letraSinAcentos = (letra: string): string => {
	let letraResultante: string = '';
	switch (letra.toLowerCase()) {
		case 'á':
			letraResultante = 'a';
			break;
		case 'é':
			letraResultante = 'e';
			break;
		case 'í':
			letraResultante = 'i';
			break;
		case 'ó':
			letraResultante = 'o';
			break;
		case 'ú':
			letraResultante = 'u';
			break;
		case 'ü':
			letraResultante = 'u';
			break;
		default:
			letraResultante = letra.toLowerCase();
	}
	return letraResultante;
}

export const esAcentuada = (letra: string): boolean => {
	const especiales: string = 'áéíóúü';
	return especiales.includes(letra.toLowerCase());
}
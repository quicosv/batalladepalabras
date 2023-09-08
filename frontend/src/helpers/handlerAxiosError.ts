import axios from 'axios';

export const handlerAxiosError = async (error: unknown): Promise<string> => {
	// Podríamos hacer una gestión simple del error, pero como el backend nos proporciona información diferente
	// por cada caso de error, podemos gestionar la respuesta al error de una manera optimizada.
	// Si el error viene de Axios...
	if (axios.isAxiosError(error)) {
		const jsonErrors = await error.response?.data;
		let msgError = '';
		switch (error.response?.status) {
			case 400:
				// jsonErrors.errors es un array de errores que vendrá cuando los validadores de Node devuelvan un error (los check)
				if (jsonErrors.errors) {
					jsonErrors.errors.forEach((x: any) => {
						// Por cada item del array, el validador devuelve una propiedad msg
						msgError += x.msg + '/';
					});
				} else {
					// El objeto con la propiedad msg es el que devolvemos nosotros de forma personalizada
					msgError = jsonErrors.msg;
				}
				break;
			case 401:
				msgError = jsonErrors.msg;
				break;
			default:
				msgError = 'No se ha podido establecer la conexión con el recurso solicitado';
				break;
		}
		return msgError;
	} else {
		return 'No se ha podido establecer la conexión con el recurso solicitado';
	}
};

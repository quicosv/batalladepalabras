import { Curso } from '../models/curso';
import { Usuario } from '../models/usuario';

export const emailExiste = async (email = '') => {
	const existeEmail = await Usuario.findOne({
		where: {
			email: email
		}
	});

	if (existeEmail) {
		throw new Error(`El email: ${email}, ya está registrado`);
	}
};

export const cursoExiste = async (nombre = '') => {
	const existeCurso = await Curso.findOne({
		where: {
			nombre: nombre
		}
	});

	if (existeCurso) {
		throw new Error(`El curso: ${nombre}, ya está creado`);
	}
};
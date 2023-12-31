import express from 'express';
import { Express } from 'express';
import http from 'http';
import cors from 'cors';
import { dbConnection } from './database/config';
import { routerAuth } from './routes/routerAuth';
import { routerJugadores } from './routes/routerJugadores';
import { Server, Socket } from 'socket.io';
import { validarJWT, validarJWTSocket } from './middlewares/validarJWT';
import { routerPalabras } from './routes/routerPalabras';
//import { routerPartidas } from './routes/routerPartidas';
import { JugadoresConectadosLista } from './classes/jugadoresConectadosLista';
import { partidasLista } from './classes/partidasLista';
import { Palabra } from './models/palabra';

const app: Express = express();
const port = process.env.PORT || 3000;

const jugadoresConectados = new JugadoresConectadosLista();
const listaDePartidas = new partidasLista();
dbConnection();

// Middlewares
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', routerAuth);
app.use('/api/jugadores', routerJugadores);
app.use('/api/palabras', routerPalabras);
// app.use('/api/partidas', validarJWT, routerPartidas);

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
	cors: {
		origin: '*'
	}
});

io.on('connection', (socket: Socket) => {
	const valido = validarJWTSocket(socket.handshake.query['x-token'] as string | undefined); // La especificación dice que puede venir como string[], por eso la conversión con as

	if (!valido) {
		console.log('socket no identificado');
		return socket.disconnect();
	}

	console.log(socket.id);
	console.log('Cliente conectado');

	// const email = socket.handshake.query['email']?.toString() || '';
	// const partida = socket.handshake.query['partida']?.toString() || '';

	// if (partida !== '') {
	//   //   jugadoresConectados.addToPartida(email, partida);
	//   //   socket.join(partida);
	//   //    io.to(partida).emit('jugadores-conectados-a-partida', jugadoresConectados.getJugadoresDePartida(partida));
	// }

	socket.emit('lista-partidas', listaDePartidas.getPartidas());
	socket.emit('jugadores-conectados', jugadoresConectados.getJugadores());

	socket.on('disconnect', () => {
		const idPartida = jugadoresConectados.getPartidaJugador(socket.id);
		jugadoresConectados.removeJugador(socket.id);
		if (idPartida) {
			const partida = listaDePartidas?.getPartida(idPartida);
			const contrincante = partida?.jugadores.find((x) => x.idSesion !== socket.id)?.idSesion;
			listaDePartidas.eliminarPartida(idPartida);
			socket.broadcast.to(contrincante!).emit('has-ganado');
			io.sockets.emit('lista-partidas', listaDePartidas.getPartidas());
			io.sockets.emit('jugadores-conectados', jugadoresConectados.getJugadores());
		}

		// const partida = jugadoresConectados.getPartidaJugador(socket.id);
		// jugadoresConectados.removeJugador(socket.id);
		// io.emit('jugadores-conectados', jugadoresConectados.getJugadores());
		// io.to(partida).emit('jugadores-conectados-a-partida', jugadoresConectados.getJugadoresDePartida(partida));
	});

	//  socket.on('conectar-a-partida', (data: { email: string; partida: string }) => {
	// jugadoresConectados.addToPartida(data.email, data.partida);
	// socket.join(data.partida);
	// io.to(data.partida).emit('jugadores-conectados-a-partida', jugadoresConectados.getJugadoresDePartida(data.partida));
	// });

	socket.on('crear-partida', async ({ nombre, numeroLetras, email }) => {
		const palabraPartida = await palabraAleatoria();
		const idPartida = listaDePartidas.addPartida(nombre, socket.id, email, palabraAleatoria.length, palabraPartida);
		if (idPartida !== 0) {
			jugadoresConectados.addJugador(email, socket.id, idPartida);
			io.sockets.emit('lista-partidas', listaDePartidas.getPartidas());
			io.sockets.emit('jugadores-conectados', jugadoresConectados.getJugadores());
		}
	});

	socket.on('unirse-a-partida', ({ email, idPartida }) => {
		listaDePartidas.getPartida(Number(idPartida)).addJugador({ email, idSesion: socket.id, partida: idPartida });
		jugadoresConectados.addJugador(email, socket.id, idPartida);
		const partida = listaDePartidas.getPartida(Number(idPartida));
		partida.addJugador({ email, idSesion: socket.id, partida: idPartida });
		io.sockets.emit('lista-partidas', listaDePartidas.getPartidas());
		io.sockets.emit('jugadores-conectados', jugadoresConectados.getJugadores());
		socket.emit('comienza-juego', listaDePartidas.getPartida(Number(idPartida)));
		socket.broadcast
			.to(partida.jugadores[0].idSesion)
			.emit('comienza-juego', listaDePartidas.getPartida(Number(idPartida)));
	});

	socket.on('notificar-has-perdido', ({ email, idPartida }) => {
		const contrincante = listaDePartidas.getPartida(Number(idPartida)).jugadores.find((x) => x.email !== email);
		socket.broadcast.to(contrincante!.idSesion).emit('has-perdido');
	});

	// socket.emit('partida-llena', (id: number) => listaDePartidas.getPartida(id).esPartidaLlena());
	// socket.on('desconectar-de-partida', (data: { email: string; partida: string }) => {
	//   //  jugadoresConectados.addToPartida(data.email, '');
	//   socket.leave(data.partida);

	//   //  io.to(data.partida).emit('jugadores-conectados-a-partida', jugadoresConectados.getJugadoresDePartida(data.partida));
	// });

	// socket.on('mensaje-privado', (data: { from: string; to: string; texto: string }) => {
	//   const mensaje = `Mensaje privado de: ${data.from} - ${data.texto}`;
	//   io.to(data.to).emit('recibir-privado', { mensaje });
	// });
});

// Puesta en marcha
httpServer.listen(port, () => {
	console.log(`Servidor en ejecución en puerto ${port}`);
});

const palabraAleatoria = async (): Promise<string> => {
	try {
		const total: number = await Palabra.count();
		// calcular nº aleatorio
		const palabraTabla = await Palabra.findByPk(Math.floor(Math.random() * total + 1));

		return palabraTabla!.dataValues.palabra;
	} catch (error) {
		return 'palabra';
	}
};

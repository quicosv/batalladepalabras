import express from 'express';
import { Express } from 'express';
import http from 'http';
import cors from 'cors';
import { dbConnection } from './database/config';
import { routerAuth } from './routes/routerAuth';
import { routerUsuarios } from './routes/routerUsuarios';
import { routerCursos } from './routes/routerCursos';
import { Server, Socket } from 'socket.io';
import { UsuariosConectadosLista } from './classes/usuariosConectadosLista';

const app: Express = express();
const port = process.env.PORT || 3000;

const usuariosConectados = new UsuariosConectadosLista();

dbConnection();

// Middlewares
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', routerAuth);
app.use('/api/usuarios', routerUsuarios);
app.use('/api/cursos', routerCursos);

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket: Socket) => {
	console.log(socket.id);
	console.log('Cliente conectado');

	usuariosConectados.addUsuario(socket.handshake.query['email']?.toString(), socket.id);

	io.sockets.emit('usuarios-conectados', usuariosConectados.getUsuarios());

	socket.on('disconnect', () => {
		const sala = usuariosConectados.getSalaUsuario(socket.id);
		usuariosConectados.removeUsuario(socket.id);
		io.emit('usuarios-conectados', usuariosConectados.getUsuarios());
		io.to(sala).emit('usuarios-conectados-a-sala', usuariosConectados.getUsuariosDeSala(sala));
	});

	socket.on('desconectar', (data: { email: string }) => {
		usuariosConectados.removeUsuarioCerrarSesion(data.email);
		socket.disconnect();
		io.emit('usuarios-conectados', usuariosConectados.getUsuarios());
	});

	socket.on('conectar-a-sala', (data: { email: string; sala: string }) => {
		usuariosConectados.addToSala(data.email, data.sala);
		socket.join(data.sala);

		io.to(data.sala).emit('usuarios-conectados-a-sala', usuariosConectados.getUsuariosDeSala(data.sala));
	});

	socket.on('desconectar-de-sala', (data: { email: string; sala: string }) => {
		usuariosConectados.addToSala(data.email, '');
		socket.leave(data.sala);

		io.to(data.sala).emit('usuarios-conectados-a-sala', usuariosConectados.getUsuariosDeSala(data.sala));
	});

});

// Puesta en marcha
httpServer.listen(port, () => {
	console.log(`Servidor en ejecución en puerto ${port}`);
});
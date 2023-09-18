import express from "express";
import { Express } from "express";
import http from "http";
import cors from "cors";
import { dbConnection } from "./database/config";
import { routerAuth } from "./routes/routerAuth";
import { routerJugadores } from "./routes/routerJugadores";
import { Server, Socket } from "socket.io";
import { validarJWT, validarJWTSocket } from "./middlewares/validarJWT";
import { routerPalabras } from "./routes/routerPalabras";
import { routerPartidas } from "./routes/routerPartidas";
import { JugadoresConectadosLista } from "./classes/jugadoresConectadosLista";

const app: Express = express();
const port = process.env.PORT || 3000;

const jugadoresConectados = new JugadoresConectadosLista();

dbConnection();

// Middlewares
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", routerAuth);
app.use("/api/jugadores", routerJugadores);
app.use("/api/palabras", routerPalabras);
app.use("/api/salas", validarJWT, routerPartidas);

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket: Socket) => {
	const valido = validarJWTSocket(
		socket.handshake.query["x-token"] as string | undefined
	); // La especificación dice que puede venir como string[], por eso la conversión con as

	if (!valido) {
		console.log("socket no identificado");
		return socket.disconnect();
	}

	console.log(socket.id);
	console.log("Cliente conectado");

	const email = socket.handshake.query["email"]?.toString() || "";
	const sala = socket.handshake.query["sala"]?.toString() || "";
	jugadoresConectados.addJugador(email, socket.id);

	if (sala !== "") {
		jugadoresConectados.addToSala(email, sala);
		socket.join(sala);

		io.to(sala).emit(
			"jugadores-conectados-a-sala",
			jugadoresConectados.getJugadoresDeSala(sala)
		);
	}

	io.sockets.emit("jugadores-conectados", jugadoresConectados.getJugadores());

	socket.on("disconnect", () => {
		const sala = jugadoresConectados.getSalaJugador(socket.id);
		jugadoresConectados.removeJugador(socket.id);
		io.emit("jugadores-conectados", jugadoresConectados.getJugadores());
		io.to(sala).emit(
			"jugadores-conectados-a-sala",
			jugadoresConectados.getJugadoresDeSala(sala)
		);
	});

	socket.on("conectar-a-sala", (data: { email: string; sala: string }) => {
		jugadoresConectados.addToSala(data.email, data.sala);
		socket.join(data.sala);

		io.to(data.sala).emit(
			"jugadores-conectados-a-sala",
			jugadoresConectados.getJugadoresDeSala(data.sala)
		);
	});

	socket.on("desconectar-de-sala", (data: { email: string; sala: string }) => {
		jugadoresConectados.addToSala(data.email, "");
		socket.leave(data.sala);

		io.to(data.sala).emit(
			"jugadores-conectados-a-sala",
			jugadoresConectados.getJugadoresDeSala(data.sala)
		);
	});

	socket.on(
		"mensaje-privado",
		(data: { from: string; to: string; texto: string }) => {
			const mensaje = `Mensaje privado de: ${data.from} - ${data.texto}`;
			io.to(data.to).emit("recibir-privado", { mensaje });
		}
	);
});

// Puesta en marcha
httpServer.listen(port, () => {
	console.log(`Servidor en ejecución en puerto ${port}`);
});

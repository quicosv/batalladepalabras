# ¡Jotaqube! Comparte tu experiencia

Bienvenidos al código del repo Jotaqube, un proyecto de clase de una aplicación que nos permite compartir código unos con otros, ¡gratis y de forma accesible!

## Descripción

El objetivo de este proyecto es completar una tarea del [curso Desarrollador/a Back-End Node.JS](https://insertaonce.arelance.com/course/view.php?id=32) que consiste en hacer una aplicación inspirada en [Código JL.](https://codigojl.web.app)

## Tecnologías utilizadas

- html5.
- css.
- Bootstrap
- typescript
- react
- node.js
- mysql

## Instalación

En este repositorio se encuentra:

- Una carpeta backend con el código del servidor.
- Una carpeta frontend con el código del cliente.
- Un archivo basededatos.sql que contiene las instrucciones necesarias para poner en marcha la base de datos.

### Instalación de la base de datos

Arranca una terminal en la carpeta raíz del proyecto y ejecuta:

`mysql -uroot -p`

A continuación tendrás que poner la contraseña del usuario root en tu instalación de mysql. Una vez hecho esto deberás ejecutar el script:

`source basededatos.sql;`

### Puesta a punto del servidor

#### Variables de entorno

Crea en la carpeta backend un archivo .env con el siguiente código:

```env
PORT=3000
DB_NAME=codejqb
DB_USER=root
DB_PASSWORD=tuclave
SECRETPRIVATEKEY=tufirma
```

Aquí tendrás que hacer los siguientes camios:

- Sustituye *tuclave* por la clave que uses en mysql.
- Sustituye *tufirma* por la que uses para firmar tokens.

#### Instalación del servidor

Teniendo una terminal en la carpeta del proyecto ejecuta esto:

```shell
cd backend
npm install
```

### Instalación del cliente

En una terminal apuntando a la carpeta del proyecto ejecuta estos comandos:

```shell
cd frontend
npm install
```

## Ejecución

Arranca una terminal en la carpeta del proyecto y ejecuta el servidor así:

```shell
cd backend
npm start
```

Arranca una segunda terminal en la que ejecutarás el cliente así:

```shell
cd frontend
npm run dev
```

Por último, abre el navegador de tu preferencia y ve a la dirección `http://localhost:5173`.

## Autores

Este proyecto está hecho por los alumnos:

- [Bilal Lahsen Chergui](https://github.com/Mskenmasters)
- [javier Goñi López](https://github.com/dinoscor)
- [Quico Saval Vicente](https://github.com/quicosv)

Agradecemos las explicaciones teóricas, la resolución de dudas y el soporte a nivel visual de nuestro profesor [Juan Luis Ochoa.](https://github.com/jlochoa)

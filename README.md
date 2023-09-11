# Batalla de palabras

Bienvenidos al código del repo batalladepalabras, el proyecto final de clase de una aplicación que nos permite jugar contra cualquier otro usuario.

## Índice

- [Descripción](#descripción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estado del proyecto](#estado-del-proyecto)
- [Autores](#autores)

## Descripción

El objetivo de este proyecto es crear una aplicación full-stack que combine todo lo aprendido en los cursos [Desarrollador/a Javascript - React](https://insertaonce.arelance.com/course/view.php?id=30) y [curso Desarrollador/a Back-End Node.JS.](https://insertaonce.arelance.com/course/view.php?id=32)

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

### Instalación de la base de datos

dentro de la carpeta backend encontrarás una carpeta llamada sql que contiene todo lo necesario para instalar la base de datos.

Arranca una terminal en esa carpeta, conéctate a mysql como se indica en el primer comentario de palabras.sql y luego podrás ejecutar `source palabras.sql;`.

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

Por último, abre el navegador de tu preferencia y ve a la dirección que te indique la segunda terminal.

## Estado del proyecto

- Hemos mejorado la accesibilidad de los formularios de login y del registro.
- Se pueden registrar usuarios. Aunque no esté definida la ruta para que en el navegador se haga login, los usuarios sí que se añaden correctamente a la base de datos.

## Autores

Este proyecto está hecho por los alumnos:

- [Bilal Lahsen Chergui](https://github.com/Mskenmasters)
- [Javier Goñi López](https://github.com/dinoscor)
- [Quico Saval Vicente](https://github.com/quicosv)

Agradecemos las explicaciones teóricas, la resolución de dudas y el soporte a nivel visual de nuestro profesor [Juan Luis Ochoa.](https://github.com/jlochoa)

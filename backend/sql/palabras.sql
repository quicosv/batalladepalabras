/*
 Para que funcione el comando que carga los datos hay que ejecutar mysql así:
 
 mysql --local-infile=1 -uroot -p
 */
set
	global local_infile = 1;

drop database if exists batalladepalabras;

create batalladepalabras;

use batalladepalabras;

create table palabras (palabra varchar(25) not null primary key);

load data local infile 'palabras.txt' into table palabras lines terminated by '\r\n';

create table usuarios (
	email varchar(100) not null primary key,
	password varchar(150) not null,
	token varchar(500) not null
);
/*
 Para que funcione el comando que carga los datos hay que ejecutar MySQL así:
 
 mysql --local-infile=1 -uroot -p
 */
set
	global local_infile = 1;

drop database if exists batalladepalabras;

show warnings;

create database batalladepalabras;

-- Modificamos la codificación de la base de datos a UTF8
ALTER DATABASE batalladepalabras CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

use batalladepalabras;

create table palabras (
	idpalabra int UNSIGNED NOT NULL AUTO_INCREMENT primary key,
	palabra varchar(30) not null
);

ALTER TABLE
	palabras CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- load data local infile 'palabras.txt' into table palabras lines terminated by '\n';
LOAD DATA LOCAL INFILE 'palabras.txt' INTO TABLE palabras LINES TERMINATED BY '\n' (palabra);

show warnings;

create table usuarios (
	email varchar(100) not null primary key,
	password varchar(150) not null,
	token varchar(500) not null
);
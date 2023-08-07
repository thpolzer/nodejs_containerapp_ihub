docker pull mysql:8.0-debian
docker pull mysql:5.7.43

# Netzwerke in Docker
docker network ls
-> Standard ist bridge
-> Container können nur auf solche Container zugreifen, in deren Netzwerken sie sich befinden
-> Standardmäßig laufen also alle Netzwerke im Bridge-Netzwerkk und können aufeinander zugreifen

## Netwerke anlegen  
docker network create <network name>
Entfernen eines Netzwerks docker network rm <network name>
docker network create database-network

## Verbinden mit Netzwerken  
Variante 1: Beim Start des Containers
Wichtig: Network Alias setzen, damit der Container von einem anderen Container auch gefunden werden kann.
docker run -it --name mysql-test --network database-network  --network-alias db-host -v $(pwd)/mysql.d:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_USER=testuser -e MYSQL_PASSWORD="testuser" -d mysql:5.7.43  

# In den Container hinein  
docker exec -it mysql-test /bin/bash  

mysql -p -u root
pw: secret

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';  
flush privileges;  

ALTER USER 'testuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';  
flush privileges; 


CREATE USER 'testuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'testuser';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON testuser.* TO 'testuser'@'localhost';

GRANT ALL ON testuser.* TO 'testuser'@'localhost';

CREATE DATABASE testuser;

grant all privileges on testuser.* to 'testuser'@'%' with grant option;

create table testuser.persons (id int,nachname varchar(30),vorname varchar(30),dg varchar(10),pp varchar(30),gehalt double);

insert into testuser.persons values (1, 'Doe', 'John', 'KD', 'PPSOH', 80000); 
insert into testuser.persons values (2, 'Berg', 'Thorsten', 'EPHK', 'HPT', 70000); 
insert into testuser.persons values (3, 'Ehrmann', 'Sabine', 'KHK', 'PPFFM', 65000); 


## Image für Webapplication  
docker build -t webapplication:v01 .  

docker run -it --name webapp-test --network database-network  --network-alias webapphost -e SERVERNAME="db-host" -p 3000:3000 webapplication:v01   
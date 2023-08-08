# 1. Installation

# 2. Überprüfung, ob Installation erfolgreich war

docker version


# 3. Images herunterladen

docker pull <Name des benötigten Images>

Beispiel: docker pull ubuntu 

oder auch: docker run ... 
Wenn docker feststellt, dass das Image noch nicht vorliegt, wird dieses von docker selbst automatisch heruntergeladen.


# 4. Ausführung

"docker run ..." nimmt ein Image und erzeugt daraus einen ausführbaren Container

docker run -it ubuntu
Parameter -it: bedeutet "interaktiv", es wird also ein Terminal angehängt, mit dem über die Tastatur Befehle eingegeben werden können.

docker run -it ubuntu bash 

lässt man das "bash" (Startkommando) weg, wird automatisch das Standardkommando gestartet.

schließen mit exit


# 5. Tags

Ergänzung des Images-Namens mit einem Doppelpunkt und der Version

docker pull ubuntu:21.10


# 6. Übersicht zu allen heruntergeldanen Ubuntu-Images

docker images


# 7. Detached Mode (Hintergrund)

docker run -d nginx

(mehrmaliges Ausführen) => z.B. 4 container entstehen


# 8. Übersicht zu laufenden Containern

docker ps

docker ps -a = laufende und gestoppte Container

"Steve Wozniak is not boring" 
-> Name Generator: https://github.com/moby/moby/blob/f586a473cf8dc9ac1edf893f70ccf37c2e217035/pkg/namesgenerator/names-generator.go#L844-L846


# 9. Logs zu Container

docker logs <id/Name des Containers>

Live-Ausgabe von Logs:
docker logs --follow <id/Name des Containers>


# 10. Vergabe von Namen

Flag: --name

docker run -d --name webserver nginx

Die Reihenfolge ist wichtig! Stünde das Name-Flag und der entsprechende Name hinter dem Imagenamen (nginx), würde das Flag 
samt Wert als Startkommando für den Container interpretiert worden.

docker run -d nginx --name webserver1
Funktioniert nicht!

Beweis: docker logs <container-ID>


# 11. Stoppen von Containern

2 Möglichkeiten:

docker stop <id> (geordnetes Herunterfahren)

docker kill <id> ("Stecker ziehen")


# 12. Aufräumen

docker system prune --all --volumes


# 13. Port-Weiterleitung

-p <port des Host-Systems>:<port des Containers>

Auch hier Reihenfolge beachten! (also nicht nach dem Imagenamen)

Also richtig:
docker run -d --name webserver -p 3001:80 nginx

curl http://localhost:3001


# 14. Volumes

Mounten eines Host-Dateisystems in den Container

-> Funktioniert nur mit absolutem Pfad
docker run -it -v /home/ubuntu:/home --name myubuntu1 ubuntu:latest


-> Beispiel: Anlegen einer einfachen html-Datei und Mounten in den nginx-Pfad

docker run -d -p 3002:80 --name webserver_nginx_html -v $(pwd):/usr/share/nginx/html nginx








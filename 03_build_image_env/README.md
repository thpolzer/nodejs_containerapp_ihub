# 1 Node-Paket "processenv" installieren

npm install processenv


# 2 Dateien vom Build ausschließen

Es gibt Module, die nicht in JS geschrieben sind, sondern beispielsweise in C unc C++, und die bei der 
Installation mit "npm install" in die jeweilige Zielplattform übersetzt werden.
Wenn beispielsweise auf einem Windows-System ein solches Modul in der Entwicklung verwendet wird, würde also eine 
Windows-spezifische Version erstellt werden, was dann aber in einem Linux-basierten Container nicht funktionieren würde.

=> node_modules-Ordner wird aus dem Image herausgenommen (ebenso wie das .git-Verzeichnis) 

=> .dockerignore-Datei 

# 3 Dockerfile 

#Schlankeres Basis-Image: Alpine, siehe https://wiki.alpinelinux.org/wiki/Main_Page 
#Image siehe https://hub.docker.com/_/node 
FROM node:20.5.0-alpine 

#Root-User vermeiden! 
#siehe https://wiki.alpinelinux.org/wiki/Setting_up_a_new_user 
RUN adduser -D dev 
USER dev 

#Setzen der Umgebungsvariable, siehe https://docs.docker.com/engine/reference/builder/ 
ENV MESSAGE "Hello IHUB developers!" 

#Setzen des Arbeitsverzeichnisses im Container, siehe https://docs.docker.com/engine/reference/builder/ 
WORKDIR /home/dev 

#das ADD-Komando läuft standardmäßig unter root und muss nun auf node gemapped werden 
#ADD ist nahezu äquivalent zu COPY, erlaubt aber darüber hinaus auch die Einbindung von remote file URLs 
#ADD ist hier nicht notwendig 
COPY --chown=dev . /home/dev  

RUN npm install 
#Vorsicht!!! 
#Hätten wir das WORKDIR nicht gesetzt, wäre "RUN npm install" im Verzeichnis des root-users ausgeführt worden und hätte eine Fehlermeldung hervorgerufen 
#Wir hätten also theoretisch folgendes Konstrukt wählen müssen: 
#RUN  cd /home/dev 
#RUN  npm install 
#Das aber hätte wiederum zu einem Fehler geführt, da für jedes RUN-Kommando ein neuer Image-Layer erzeugt wird und für hierfür eine neue Shell im  Stamm-Verzeichnis (root) geöffnt wird! 
#Lösung: Zusammenführung der Kommandos in einem RUN-Befehl: RUN  cd /home/dev && npm install 

#ohne WORKDIR müsste man schreiben: CMD ["node", "/home/dev/app.js"]
CMD ["node", "app.js"]

# 4 Build-Kommando
docker build -t advancedapp:v01 .

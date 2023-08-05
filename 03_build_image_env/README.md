#1 Node-Paket "processenv" installieren

npm install processenv


#2 Dateien vom Build ausschließen

Es gibt Module, die nicht in JS geschrieben sind, sondern in C unc C++ geschrieben sind und die bei der 
Installation mit "npm install" in die jeweilige Zielplattform übersetzt werden.
Wenn also auf einem Windows-System ein solches Modul in der Entwicklung verwendet wird, würde also eine 
Windows-spezifische Version erstellt werden, das dann aber in einem Linux-basierten Container nicht funktionieren wird.

=> node_modules-Ordner wird aus dem Image herausgenommen (ebenso wie das .git-Verzeichnis)

=> .dockerignore-Datei


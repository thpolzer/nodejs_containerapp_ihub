# build
docker build -t polzer/container-app-ihub:v01 .

# run
docker run -d --network=host -e SERVERNAME=localhost -p 3000:3000 polzer/container-app-ihub:v01




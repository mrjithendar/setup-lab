git pull

docker-compose down

docker volume ls -q | xargs -L1 docker rm

docker-compose up -d
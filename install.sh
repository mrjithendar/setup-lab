git pull

docker-compose down

docker volume ls -q | xargs -L1 docker volume rm

docker-compose up -d --remove-orphans
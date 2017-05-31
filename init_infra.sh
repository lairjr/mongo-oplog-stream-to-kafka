#bin/sh
echo 'Starting mongo'

docker-compose up -d mongodb
docker-compose up dbConfig

echo 'Starting kafka'
docker-compose up -d zookeeper
sleep 10
docker-compose up -d kafka
sleep 10
docker-compose up topic

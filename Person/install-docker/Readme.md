## About
Create nginx proxy container with LetsEncrypt companion.
Only two containers will be created with this file.
New containers will automatically support SSL, no need to configure individually.

## Create network nginx-proxy
docker network create nginx-proxy

## Create nginx-proxy
sudo docker compose -f nginx-proxy-ssl.yml create

sudo docker compose -f nginx-proxy-ssl.yml start

sudo docker compose -f nginx-proxy-ssl.yml stop

sudo docker compose -f nginx-proxy-ssl.yml rm

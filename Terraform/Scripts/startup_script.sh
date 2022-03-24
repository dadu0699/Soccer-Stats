#!/bin/bash

sudo apt update
sudo apt install -y docker.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo ${google_credentials_file} | base64 --decode > google_credentials.json
echo ${gcr_id}

cat google_credentials.json | docker login -u _json_key --password-stdin https://gcr.io

docker run -d -p 5000:5000 --restart always --name customer-service ${gcr_id}/customer-service:latest
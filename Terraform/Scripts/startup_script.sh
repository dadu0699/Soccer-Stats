#!/bin/bash

sudo apt update
sudo apt install -y docker.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

${google_access_token} | docker login -u oauth2accesstoken --password-stdin https://gcr.io

docker run -d -p 5000:5000 --restart always --name customer-service ${gcr_id}/customer-service:latest
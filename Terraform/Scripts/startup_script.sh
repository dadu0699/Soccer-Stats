#!/bin/bash

sudo apt update
sudo apt install -y docker.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo '${google_access}' | sudo docker login -u _json_key --password-stdin https://gcr.io

# Microservices
sudo docker run -d -p 5000:5000 --restart always --name customer-service ${gcr_id}/customer-service:latest
sudo docker run -d -p 5001:5001 --restart always --name team-service ${gcr_id}/team-service:latest
sudo docker run -d -p 5002:5002 --restart always --name match-service ${gcr_id}/match-service:latest
sudo docker run -d -p 5003:5003 --restart always --name competition-service ${gcr_id}/competition-service:latest
sudo docker run -d -p 5004:5004 --restart always --name stadium-service ${gcr_id}/stadium-service:latest
sudo docker run -d -p 5005:5005 --restart always --name technical-service ${gcr_id}/technical-service:latest
# sudo docker run -d -p 5006:5006 --restart always --name player-service ${gcr_id}/player-service:latest
sudo docker run -d -p 5007:5007 --restart always --name post-service ${gcr_id}/post-service:latest
sudo docker run -d -p 5010:5010 --restart always --name auth-service ${gcr_id}/auth-service:latest
# sudo docker run -d -p 5011:5011 --restart always --name administrator-service ${gcr_id}/administrator-service:latest
sudo docker run -d -p 5012:5012 --restart always --name employee-service ${gcr_id}/employee-service:latest
sudo docker run -d -p 5013:5013 --restart always --name country-service ${gcr_id}/country-service:latest

# Frontend
sudo docker run -d -p 80:80 --restart always --name frontend ${gcr_id}/${frontend_image}:latest
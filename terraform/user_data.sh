#!/bin/bash
apt update -y
apt install -y docker.io docker-compose git
usermod -aG docker ubuntu

# Clone the repo (replace with your public GitHub URL)
cd /home/ubuntu
sudo -u ubuntu git clone https://github.com/getGlitch/Note-Making-App app
cd app

# Run your Docker Compose stack
sudo -u ubuntu docker-compose up -d

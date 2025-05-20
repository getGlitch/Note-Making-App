#!/bin/bash
apt update -y
apt install -y docker.io docker-compose git
usermod -aG docker ubuntu

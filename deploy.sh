#!/bin/bash

set -euo pipefail

DOCKER_SERVICE_SERVER="server"
DOCKER_SERVICE_CLIENT="client"

IMAGE_NAME_SERVER="website_visualizations-server"
IMAGE_NAME_CLIENT="website_visualizations-client"


log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "🔄 Pulling latest code from main..."
git fetch --all && git reset --hard origin/main

log "🛑 Stopping Docker container: nginx..."
docker compose down "nginx" || true

log "🛑 Stopping Docker container: $DOCKER_SERVICE_SERVER..."
docker compose down "$DOCKER_SERVICE_SERVER" || true

log "🛑 Stopping Docker container: $DOCKER_SERVICE_CLIENT..."
docker compose down "$DOCKER_SERVICE_CLIENT" || true

log "♻️ Removing old Docker image: $IMAGE_NAME_SERVER..."
docker image rm "$IMAGE_NAME_SERVER" || true

log "♻️ Removing old Docker image: $IMAGE_NAME_CLIENT..."
docker image rm "$IMAGE_NAME_CLIENT" || true

log "🚀 Starting Docker container: $DOCKER_SERVICE_SERVER..."
docker compose up -d "$DOCKER_SERVICE_SERVER" || true

log "🚀 Starting Docker container: $DOCKER_SERVICE_CLIENT..."
docker compose up -d "$DOCKER_SERVICE_CLIENT" || true

log "🚀 Starting Docker container: nginx..."
docker compose up -d "nginx" || true

log "✅ Deployment completed successfully."

log "Remove builder container..."
docker builder prune -f || true


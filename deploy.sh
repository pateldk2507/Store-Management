#!/bin/bash
set -e

echo "===================================="
echo "🚀 DEPLOYMENT STARTED"
echo "===================================="

APP_DIR="/var/www/myapp"
FRONTEND_DIR="$APP_DIR/frontend"
LOG_FILE="$APP_DIR/deploy.log"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "📅 Date: $(date)"
echo "📁 App dir: $APP_DIR"

cd "$APP_DIR"

echo "🔄 Resetting local changes..."
git reset --hard
git clean -fd

echo "📥 Pulling latest code from GitHub..."
git pull origin main

echo "===================================="
echo "🎨 FRONTEND DEPLOY"
echo "===================================="

if [ -d "$FRONTEND_DIR" ]; then
  cd "$FRONTEND_DIR"

  echo "📦 Installing frontend dependencies..."
  npm install

  echo "🏗️ Building React frontend..."
  npm run build
else
  echo "❌ Frontend directory not found!"
  exit 1
fi

echo "===================================="
echo "🔁 BACKEND RESTART"
echo "===================================="

# Restart Node backend if running
if command -v pm2 >/dev/null 2>&1; then
  echo "♻️ Restarting PM2 apps..."
  pm2 restart all || true
else
  echo "⚠️ PM2 not installed, skipping restart"
fi

echo "===================================="
echo "✅ DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "===================================="

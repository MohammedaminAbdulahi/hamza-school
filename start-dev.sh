#!/bin/bash
# Persistent dev server watchdog — restarts if it dies
cd /home/z/my-project
while true; do
  echo "[$(date)] starting next dev..."
  node node_modules/.bin/next dev -p 3000 >> /home/z/my-project/dev.log 2>&1
  echo "[$(date)] server exited (code $?), restarting in 2s..."
  sleep 2
done

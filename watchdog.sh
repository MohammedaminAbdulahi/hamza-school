#!/bin/bash
# Watchdog: check if dev server is running on port 3000, restart if not
# Run via crontab every minute

# Check if port 3000 is listening
if ! curl -s -o /dev/null -m 3 http://localhost:3000/ 2>/dev/null; then
  # Server not responding, kill any stale processes
  pkill -9 -f "next dev" 2>/dev/null
  sleep 1
  # Start fresh
  cd /home/z/my-project
  nohup node node_modules/.bin/next dev -p 3000 </dev/null >>/home/z/my-project/dev.log 2>&1 &
  disown
  echo "[$(date)] server restarted" >> /home/z/my-project/watchdog.log
fi

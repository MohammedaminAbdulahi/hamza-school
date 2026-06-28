#!/usr/bin/env python3
"""
Persistent dev server daemon for Hamza School.
Uses double-fork to fully detach from the parent process, surviving shell exits.
Usage: python3 /home/z/my-project/daemon-dev.py
"""
import os, sys, time, subprocess, signal

LOG = '/home/z/my-project/dev.log'
PORT = 3000

def is_running():
    try:
        import urllib.request
        urllib.request.urlopen(f'http://localhost:{PORT}/', timeout=3)
        return True
    except:
        return False

def start_server():
    # Double-fork to daemonize
    pid = os.fork()
    if pid > 0:
        os.waitpid(pid, 0)
        return
    os.setsid()
    pid = os.fork()
    if pid > 0:
        os._exit(0)
    # Redirect FDs
    fd_in = os.open('/dev/null', os.O_RDONLY)
    fd_out = os.open(LOG, os.O_WRONLY | os.O_CREAT | os.O_TRUNC)
    os.dup2(fd_in, 0)
    os.dup2(fd_out, 1)
    os.dup2(fd_out, 2)
    # Exec next dev
    os.execvp('node', ['node', 'node_modules/.bin/next', 'dev', '-p', str(PORT)])

if __name__ == '__main__':
    os.chdir('/home/z/my-project')
    if is_running():
        print("Server already running")
        sys.exit(0)
    # Kill stale processes
    os.system('pkill -9 -f "next dev" 2>/dev/null')
    time.sleep(1)
    start_server()
    # Wait for it to be ready
    for i in range(40):
        time.sleep(1)
        if is_running():
            print(f"Server ready after {i+1}s")
            sys.exit(0)
    print("Server failed to start")
    sys.exit(1)

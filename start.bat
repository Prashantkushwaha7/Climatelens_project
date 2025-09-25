@echo off
echo Starting ClimateLens...
cd server
start "Server" npm start
cd ..\client  
start "Client" npm start
echo Project started!
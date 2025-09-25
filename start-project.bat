@echo off
echo Starting ClimateLens Project...
echo.

echo 1. Initializing Database...
cd server
node initDB.js
if %errorlevel% neq 0 (
    echo Database initialization failed!
    pause
    exit /b 1
)

echo.
echo 2. Installing server dependencies...
call npm install

echo.
echo 3. Installing client dependencies...
cd ..\client
call npm install

echo.
echo 4. Starting the project...
echo Opening server in new window...
start "ClimateLens Server" cmd /k "cd /d %~dp0server && npm start"

timeout /t 3 /nobreak > nul

echo Opening client in new window...
start "ClimateLens Client" cmd /k "cd /d %~dp0client && npm start"

echo.
echo ✅ Project started successfully!
echo Server: http://localhost:5000
echo Client: http://localhost:3000
echo.
pause
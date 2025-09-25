# ClimateLens Setup Guide for Windows

## Prerequisites

### 1. Install Node.js
- Download and install Node.js from https://nodejs.org/
- Choose the LTS version (recommended)
- Verify installation: `node --version` and `npm --version`

### 2. Install MongoDB
- Download MongoDB Community Server from https://www.mongodb.com/try/download/community
- Install with default settings
- Start MongoDB service (usually starts automatically)


## Project Setup

### 1. Clone/Copy Project
```bash
# If using Git
git clone <your-repo-url>
cd project

# Or copy the project folder to your Windows machine
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd server
npm install
```

#### Frontend Setup
```bash
cd ../client
npm install
```

### 3. Environment Configuration

#### Server Environment (.env in server folder)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/climatelens
GEMINI_API_KEY=AIzaSyBUa17TJU8_b8e4CIu9hHjmOwDhBotXE6A
OPENWEATHER_API_KEY=6591a1f5d3d972c50e8772ad8c929cdd
WEATHER_API_URL=https://api.openweathermap.org/data/2.5
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=niraula76kunjan@gmail.com
EMAIL_HOST_PASSWORD=efcguvleetevhrcz
```

#### Client Environment (.env in client folder)
```env
REACT_APP_OPENWEATHER_API_KEY=6591a1f5d3d972c50e8772ad8c929cdd
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

## Running the Application

### Method 1: Using Concurrent (Recommended)
```bash
# From project root directory
npm run dev
```

### Method 2: Separate Terminals
#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd client
npm start
```

### Method 3: Batch File (Windows Easy Start)
Create `start.bat` in project root:
```batch
@echo off
echo Starting ClimateLens...
echo.
echo Starting Backend Server...
start cmd /k "cd server && npm run dev"
echo.
echo Starting Frontend...
start cmd /k "cd client && npm start"
echo.
echo Both servers are starting in separate windows.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
pause
```

Double-click `start.bat` to run both servers automatically.



## Troubleshooting

### MongoDB Issues
- Ensure MongoDB service is running: `net start MongoDB`
- Check connection: `mongo` command should connect

### Port Issues
- Frontend runs on port 3000
- Backend runs on port 5000
- Ensure these ports are available

### API Keys
- Get your own OpenWeather API key from https://openweathermap.org/api
- Get Gemini API key from https://makersuite.google.com/app/apikey
- Replace the keys in .env files

### Windows Firewall
- Allow Node.js through Windows Firewall when prompted
- Allow ngrok through firewall for public access

## Features
- 🗺️ Interactive map with story locations
- 📝 Story submission with map location picker
- 🤖 AI-generated climate stories
- 🔊 Text-to-speech in multiple languages
- 👤 User authentication with OTP
- 📧 Email notifications

## Default Login
Create an account through the registration form or use the forgot password feature with OTP verification.

## Quick Start Commands

### First Time Setup
```bash
# Install all dependencies
npm run install-all

# Start both servers
npm run dev
```

### Access URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Support
For issues, check the console logs in both frontend (browser dev tools) and backend (terminal) for error messages.
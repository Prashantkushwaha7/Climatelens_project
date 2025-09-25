# Database Setup and Project Start Guide

## Prerequisites
- Node.js installed
- MongoDB installed and running
- npm available

## Database Setup Steps

1. **Start MongoDB Service**
   - Ensure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/climatelens`

2. **Initialize Database**
   ```bash
   cd server
   npm install
   npm run init-db
   ```

3. **Verify Database Connection**
   ```bash
   npm run check-db
   ```

## Start the Project

### Option 1: Manual Start
1. **Start Server**
   ```bash
   cd server
   npm start
   ```
   Server will run on: http://localhost:5000

2. **Start Client** (in new terminal)
   ```bash
   cd client
   npm install
   npm start
   ```
   Client will run on: http://localhost:3000

### Option 2: Use Batch Script
Double-click `start-project.bat` in the project root

## Database Collections
The following collections will be created:
- `users` - User accounts and profiles
- `stories` - Climate stories and reports
- `notifications` - System notifications
- `otps` - One-time passwords for verification

## Environment Variables
Server uses these environment variables from `.env`:
- `MONGODB_URI` - Database connection string
- `PORT` - Server port (default: 5000)
- `GEMINI_API_KEY` - AI service key
- `EMAIL_HOST_USER` - Email service configuration

## Troubleshooting
- Ensure MongoDB is running before starting the server
- Check that ports 3000 and 5000 are available
- Verify all dependencies are installed with `npm install`
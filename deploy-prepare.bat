@echo off
echo ========================================
echo   Deployment Preparation Script
echo ========================================
echo.

echo Step 1: Installing dependencies...
echo.
echo Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Error: Client dependencies installation failed
    pause
    exit /b %errorlevel%
)
echo Client dependencies installed successfully!
echo.

cd ..
echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error: Server dependencies installation failed
    pause
    exit /b %errorlevel%
)
echo Server dependencies installed successfully!
echo.

cd ..
echo Step 2: Building frontend...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo Error: Frontend build failed
    pause
    exit /b %errorlevel%
)
echo Frontend built successfully!
echo.

cd ..
echo ========================================
echo   Deployment Preparation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Create MongoDB Atlas database
echo 2. Update environment variables
echo 3. Deploy backend to Render
echo 4. Deploy frontend to Netlify
echo.
echo See DEPLOYMENT.md for detailed instructions
echo.
pause

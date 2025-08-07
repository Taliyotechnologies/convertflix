@echo off
echo ========================================
echo ConvertFlix - Dependency Installation
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js is installed!
echo.

echo Installing frontend dependencies...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies!
    echo.
    pause
    exit /b 1
)

echo.
echo Frontend dependencies installed successfully!
echo.
echo To start the development server:
echo   cd frontend
echo   npm run dev
echo.
echo To build for production:
echo   cd frontend
echo   npm run build
echo.
pause

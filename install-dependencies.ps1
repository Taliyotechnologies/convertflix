# ConvertFlix - Dependency Installation Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ConvertFlix - Dependency Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking if Node.js is installed..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js is installed! Version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Check if npm is available
Write-Host "Checking if npm is available..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "npm is available! Version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: npm is not available!" -ForegroundColor Red
    Write-Host "Please ensure npm is properly installed with Node.js" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
try {
    npm install
    Write-Host "Frontend dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to install frontend dependencies!" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "To build for production:" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run build" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"

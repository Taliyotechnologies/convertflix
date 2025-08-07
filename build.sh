#!/bin/bash
set -e

echo "Starting build process..."
echo "Current directory: $(pwd)"

# Navigate to frontend directory
cd frontend
echo "Changed to frontend directory: $(pwd)"

# Clear npm cache and install dependencies
echo "Installing dependencies..."
npm cache clean --force
npm install --no-optional

# Build the project
echo "Building project..."
npm run build

echo "Build completed successfully!"

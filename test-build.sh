#!/bin/bash

# Script untuk menguji proses build secara lokal
echo "====== Testing build process locally ======"

# Periksa versi Node.js dan NPM
echo "Checking Node.js and NPM versions..."
node -v
npm -v

# Install dependencies
echo "Installing dependencies..."
npm ci

# Jalankan linting (akan melanjutkan meskipun ada warning)
echo "Running linting..."
npm run lint:fix || echo "Linting issues found but continuing"

# Jalankan build
echo "Building project..."
npm run build

# Jika build berhasil
if [ $? -eq 0 ]; then
  echo "✅ Build successful! Your project should deploy without issues."
else
  echo "❌ Build failed. Please fix the issues before pushing to GitHub."
  exit 1
fi

echo "====== Build test complete ======"

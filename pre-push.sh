#!/bin/sh

# Jalankan linting dan perbaiki masalah sebelum push
echo "Running lint:fix before pushing..."
npm run lint:fix || { echo "Linting gagal! Silakan perbaiki error terlebih dahulu."; exit 1; }

# Continue with push jika linting berhasil
exit 0

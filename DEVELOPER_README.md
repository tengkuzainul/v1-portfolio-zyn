# Portfolio Website Development Guide

## Menghindari Error pada Deployment

Untuk memastikan deployment selalu berhasil ke Vercel tanpa masalah, ikuti panduan berikut:

### 1. Sebelum Commit & Push:

```bash
# Jalankan linting dan perbaiki masalah
npm run lint:fix

# Build lokal untuk memastikan tidak ada error
npm run build
```

### 2. Pastikan Secrets di GitHub Sudah Dikonfigurasi:

GitHub repository ini memerlukan 3 secrets untuk deployment ke Vercel:
- `VERCEL_TOKEN` - Token API dari Vercel
- `VERCEL_ORG_ID` - ID organisasi Vercel
- `VERCEL_PROJECT_ID` - ID proyek Vercel

Pastikan ketiga secrets ini sudah dikonfigurasi dengan benar di Settings > Secrets and variables > Actions.

### 3. Branch Utama untuk Production:

Deployment production otomatis hanya terjadi ketika ada push ke branch `master`.

### 4. Menjalankan Workflow Manual:

Jika deployment otomatis gagal, Anda dapat menjalankan workflow manual:
1. Buka tab Actions di GitHub repository
2. Pilih "Vercel Production Deployment"
3. Klik "Run workflow"

## Memperbarui Workflow

Jika workflow deployment perlu diperbarui, file konfigurasi berada di:
- `.github/workflows/vercel-production-deploy.yml` - untuk deployment production
- `.github/workflows/vercel-preview-deploy.yml` - untuk deployment preview

## Troubleshooting

Jika deployment gagal:
1. Periksa log error di GitHub Actions
2. Pastikan semua secrets sudah benar
3. Jalankan build lokal untuk menemukan error
4. Periksa koneksi Vercel dengan GitHub di dashboard Vercel

## Tentang ESLint

Konfigurasi ESLint telah diatur untuk meminimalkan error yang menghentikan build. Jika ada perubahan tipe yang kompleks, pertimbangkan untuk menggunakan directive berikut:

```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```

---

Happy Coding! 😊

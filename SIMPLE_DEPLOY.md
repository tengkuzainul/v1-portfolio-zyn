# Panduan Deployment Sederhana ke Vercel

Untuk website portfolio ini, kita menggunakan cara deployment langsung ke Vercel tanpa workflow otomatis yang rumit.

## Cara Deployment

### Metode 1: Deployment dari CLI (Termudah)

1. Pastikan Anda telah login ke Vercel CLI:
   ```bash
   vercel login
   ```

2. Jalankan perintah untuk deployment produksi:
   ```bash
   vercel --prod
   ```

   Ini akan otomatis:
   - Melakukan build project
   - Mengupload ke Vercel
   - Melakukan deployment ke production URL

### Metode 2: Deployment dari Vercel Dashboard

1. Push perubahan ke GitHub repository
2. Login ke [Vercel Dashboard](https://vercel.com)
3. Pilih project portfolio Anda
4. Klik "Deploy" untuk mendeploy versi terbaru

## Troubleshooting

Jika terjadi masalah saat deployment:

1. **Error build**: Jalankan `npm run build` secara lokal untuk memeriksa error
2. **Error linting**: Jalankan `npm run lint:fix` untuk memperbaiki masalah
3. **Error TypeScript**: Tambahkan `// @ts-ignore` di atas baris yang bermasalah

## Catatan Penting

- Semua deployment ke production menggunakan branch `master`
- Jika Anda ingin mencoba versi baru tanpa mengganggu production, gunakan `vercel` (tanpa `--prod`) untuk membuat preview deployment
- Semua file sensitif dan kredensial TIDAK boleh di-push ke GitHub (lihat .gitignore)

Deployment dengan cara ini lebih mudah dimengerti dan dikelola untuk website portfolio pribadi.

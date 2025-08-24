# Panduan Keamanan untuk Proyek Portfolio

Dokumen ini berisi panduan keamanan untuk memastikan bahwa proyek portfolio ini dijaga dengan baik dan tidak mengekspos data sensitif.

## Praktik Keamanan yang Harus Diikuti

### 1. Manajemen Secrets dan Credentials

- **JANGAN PERNAH** commit file-file berikut ke repository:
  - File `.env.*` yang berisi credentials
  - Private keys, sertifikat, atau kredensial keamanan
  - Token akses API atau token autentikasi
  - Password, seed phrases, atau informasi login lainnya

- **SELALU** gunakan variabel lingkungan untuk informasi sensitif
  - Gunakan `.env.local` untuk lokal (tidak pernah di-commit)
  - Gunakan Vercel Environment Variables untuk deployment

### 2. Perlindungan Kode

- Hindari hardcoding informasi sensitif dalam kode
- Gunakan environment variables yang diakses melalui `process.env`
- Verifikasi dan sanitasi semua input pengguna
- Gunakan Content Security Policy (CSP) untuk mencegah XSS

### 3. Praktik Git yang Aman

- Periksa commit sebelum push untuk memastikan tidak ada data sensitif
- Gunakan `.gitignore` yang telah diperbarui
- Jika secara tidak sengaja melakukan commit data sensitif:
  1. Segera ubah kredensial yang terekspos
  2. Gunakan `git filter-branch` atau BFG Repo-Cleaner untuk menghapus data sensitif dari history

### 4. Perlindungan API dan Endpoint

- Terapkan rate limiting untuk mencegah abuse
- Validasi semua input pada server side
- Gunakan CORS dengan setting yang tepat
- Untuk API keys yang digunakan di client-side, gunakan proxy server untuk melindungi key asli

### 5. Pengaturan Deployment

- Pastikan semua secrets disimpan dengan aman di Vercel
- Periksa permission header yang benar (telah diatur di vercel.json)
- Gunakan Sentry untuk monitoring error tanpa mengekspos stack trace ke pengguna

## Checklist Keamanan Sebelum Deployment

- [ ] Semua kredensial disimpan sebagai environment variables
- [ ] Tidak ada hardcoded secrets dalam source code
- [ ] API endpoints dilindungi dengan baik
- [ ] File `.env.local` tidak di-commit ke repository
- [ ] Assets pribadi (seperti CV PDF) tidak di-commit ke repository publik
- [ ] File `.gitignore` mencakup semua file sensitif

## Penanganan Data Pribadi

Untuk file seperti CV atau data pribadi lainnya:
1. Simpan di `private/assets/` yang telah dikonfigurasi di `.gitignore`
2. Gunakan API route untuk mengontrol akses ke file-file ini
3. Pertimbangkan untuk menggunakan penyimpanan terpisah seperti Amazon S3 untuk file-file sensitif

---

**Penting:** Jika Anda menemukan masalah keamanan dalam proyek ini, segera perbaiki dan update panduan ini sesuai kebutuhan.

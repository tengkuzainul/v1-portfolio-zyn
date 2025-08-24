# PANDUAN DEPLOYMENT KE VERCEL

## ⚠️ PENTING: Cara Menghindari Error Deployment

Untuk memastikan website selalu berhasil di-deploy ke Vercel secara otomatis, ikuti panduan ini dengan cermat.

## 🔑 Secrets Yang Diperlukan

GitHub Actions membutuhkan tiga secrets untuk deployment ke Vercel:

1. **VERCEL_TOKEN** - Token API dari Vercel

   - Cara mendapatkan: [Vercel Dashboard → Settings → Tokens](https://vercel.com/account/tokens)

2. **VERCEL_ORG_ID** - ID Organisasi Vercel

   - Cara mendapatkan: [Vercel Dashboard → Settings → General](https://vercel.com/dashboard/settings)

3. **VERCEL_PROJECT_ID** - ID Project Vercel
   - Cara mendapatkan: Dari dashboard project → Settings → General

## 🚀 Langkah Wajib Sebelum Push

```bash
# 1. Jalankan testing build untuk memastikan tidak ada error
bash test-build.sh

# 2. ATAU manual dengan langkah-langkah berikut:
npm run lint:fix  # Perbaiki masalah linting secara otomatis
npm run build     # Build project untuk mendeteksi error
```

## 🛠 Cara Mendiagnosis Error Deployment

1. **Periksa error log di GitHub Actions**:

   - Buka tab Actions di repository GitHub
   - Klik workflow "Deploy to Vercel" yang gagal
   - Periksa step yang error (berwarna merah)

2. **Cara umum memperbaiki error**:
   - **Error TypeScript**: Perbaiki tipe data dengan menambahkan tipe yang tepat
   - **Error Linting**: Jalankan `npm run lint:fix` untuk perbaikan otomatis
   - **Error Token**: Periksa secrets di GitHub repository

## 🔧 Memperbaiki Kesalahan Umum

### Memperbaiki Error ESLint

Jika ada error ESLint yang mengganggu deployment:

1. **Untuk variable tidak terpakai**:

   ```tsx
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const unusedVar = "value";
   ```

2. **Untuk penggunaan any**:
   ```tsx
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const data: any = fetchData();
   ```

### Memperbaiki Error TypeScript

1. **Mengatasi error terkait props React**:
   ```tsx
   interface ButtonProps {
     label: string;
     onClick?: () => void; // Gunakan optional (?) untuk prop yang tidak wajib
   }
   ```

## 📋 Checklist Deployment Sukses

- [ ] Semua dependensi terinstall (`npm ci`)
- [ ] Linting berhasil atau warning yang aman (`npm run lint`)
- [ ] Build berhasil (`npm run build`)
- [ ] Semua secrets GitHub terkonfigurasi dengan benar
- [ ] File `.github/workflows/deploy-to-vercel.yml` tidak dimodifikasi

## 📚 Referensi Tambahan

- [Dokumentasi GitHub Actions](https://docs.github.com/en/actions)
- [Dokumentasi Vercel CLI](https://vercel.com/docs/cli)
- [Mengatasi masalah umum Vercel](https://vercel.com/guides/troubleshooting-vercel-cli)

---

### 🚨 Mengapa Deployment Bisa Gagal?

1. **Token Vercel tidak valid atau expired**
2. **Error ESLint atau TypeScript yang tidak diperbaiki**
3. **Dependencies yang konflik atau incompatible**
4. **Environment variables yang hilang**
5. **Memory limit exceeded pada build process**

Selalu test build secara lokal sebelum push ke GitHub!

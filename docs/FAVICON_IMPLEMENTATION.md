# Favicon Implementation Guide

## Overview

Proyek ini telah dikonfigurasi dengan favicon lengkap yang menggunakan logo `TZ` yang dibuat khusus. Favicon telah dioptimalkan untuk semua platform dan ukuran.

## File Favicon yang Dibuat

### 1. SVG Files (Vector)

- `public/images/favicon/16x16.svg`
- `public/images/favicon/32x32.svg` (Original)
- `public/images/favicon/48x48.svg`
- `public/images/favicon/64x64.svg`
- `public/images/favicon/128x128.svg`
- `public/images/favicon/192x192.svg`
- `public/images/favicon/512x512.svg`

### 2. PNG Files (Raster)

- `public/images/favicon/16x16.png`
- `public/images/favicon/32x32.png`
- `public/images/favicon/48x48.png`
- `public/images/favicon/64x64.png`
- `public/images/favicon/128x128.png`
- `public/images/favicon/192x192.png`
- `public/images/favicon/512x512.png`

### 3. Special Files

- `public/favicon.ico` - Traditional favicon file
- `public/images/favicon/apple-touch-icon.png` - iOS home screen icon (180x180)
- `public/manifest.json` - PWA manifest file

## Implementation Details

### 1. Metadata Configuration

Favicon telah dikonfigurasi di `src/app/layout.tsx` dengan metadata lengkap:

```typescript
icons: {
  icon: [
    { url: "/images/favicon/16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/images/favicon/32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/images/favicon/48x48.png", sizes: "48x48", type: "image/png" },
    { url: "/images/favicon/64x64.png", sizes: "64x64", type: "image/png" },
    { url: "/images/favicon/128x128.png", sizes: "128x128", type: "image/png" },
    { url: "/images/favicon/32x32.svg", sizes: "any", type: "image/svg+xml" },
  ],
  shortcut: "/favicon.ico",
  apple: [
    { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
},
manifest: "/manifest.json",
```

### 2. PWA Manifest

File `manifest.json` telah dibuat untuk mendukung Progressive Web App dengan:

- Icons dalam berbagai ukuran
- Theme colors
- Display mode standalone
- Proper naming dan description

### 3. Platform Support

Favicon ini mendukung:

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ iOS Safari (apple-touch-icon)
- ✅ Android Chrome (PWA manifest)
- ✅ Windows taskbar
- ✅ Browser tabs
- ✅ Bookmarks
- ✅ PWA installation

### 4. Automatic Generation

Semua file favicon telah di-generate otomatis dari file SVG original menggunakan Sharp library untuk memastikan kualitas terbaik.

## Testing

1. Buka browser dan navigate ke `http://localhost:3000`
2. Periksa tab browser - favicon harus muncul
3. Bookmark halaman - favicon harus muncul di bookmark
4. Test di mobile device untuk iOS dan Android
5. Test PWA installation

## File Structure

```
public/
├── favicon.ico
├── manifest.json
└── images/
    └── favicon/
        ├── 16x16.png
        ├── 16x16.svg
        ├── 32x32.png
        ├── 32x32.svg (original)
        ├── 48x48.png
        ├── 48x48.svg
        ├── 64x64.png
        ├── 64x64.svg
        ├── 128x128.png
        ├── 128x128.svg
        ├── 192x192.png
        ├── 192x192.svg
        ├── 512x512.png
        ├── 512x512.svg
        └── apple-touch-icon.png
```

## Notes

- Semua favicon menggunakan design logo `TZ` yang konsisten
- SVG files memberikan scalability terbaik
- PNG files untuk compatibility maksimal
- Colors: Background `#F7F7F7`, Text `#1E1E1E`
- Optimized untuk light dan dark theme

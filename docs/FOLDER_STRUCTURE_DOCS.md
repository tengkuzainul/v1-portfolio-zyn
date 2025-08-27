# Dokumentasi Struktur Folder Project Portfolio

## 📁 Struktur Folder Baru (Next.js 15 Best Practices)

```
src/
├── app/                          # App Router (Next.js 15)
│   ├── layout.tsx               # Root layout untuk semua pages
│   ├── page.tsx                 # Homepage (/)
│   ├── globals.css              # Global CSS styles
│   ├── robots.ts                # SEO robots configuration
│   ├── sitemap.ts               # SEO sitemap generation
│   ├── projects/                # Projects route
│   │   └── page.tsx            # All projects page (/projects)
│   └── api/                     # API routes
│       ├── downloads/route.ts   # File download API
│       ├── og/route.tsx         # Open Graph image generation
│       └── sentry-example-api/route.ts
├── components/                   # Reusable components
│   ├── features/                # Feature-based components
│   │   ├── home/               # Homepage specific components
│   │   │   ├── home-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── hero-content.tsx
│   │   │   ├── tech-stack.tsx
│   │   │   ├── components.ts   # Lazy loading exports
│   │   │   └── index.ts        # Component exports
│   │   └── projects/           # Projects specific components
│   │       └── project-section.tsx
│   ├── layout/                 # Layout components
│   │   └── navbar.tsx          # Navigation component
│   ├── ui/                     # Reusable UI components
│   │   ├── preloader.tsx       # Loading animation
│   │   ├── animate-on-scroll.tsx
│   │   ├── page-transition.tsx
│   │   ├── shiny-button.tsx
│   │   └── ...
│   ├── magicui/                # Third-party UI components
│   │   ├── animated-theme-toggler.tsx
│   │   └── morphing-text.tsx
│   ├── reactbits/              # External component libraries
│   │   ├── PixelTransition/
│   │   └── TextType/
│   ├── animation/              # Animation specific components
│   │   └── scroll-reveal.tsx
│   ├── providers/              # Context providers
│   │   ├── providers.tsx
│   │   ├── navigation-provider.tsx
│   │   └── smooth-scroll-provider.tsx
│   └── web-vitals.tsx          # Performance monitoring
├── data/                        # Data and configurations
│   └── projects-data.ts        # Project information and types
├── hooks/                       # Custom React hooks
│   └── use-smooth-scroll.ts
├── lib/                         # Utility libraries
│   ├── types.ts                # TypeScript type definitions
│   ├── constants.ts            # Application constants
│   ├── utils.ts                # Utility functions
│   ├── lazy-load.tsx           # Lazy loading utilities
│   └── safe-console.ts         # Safe console logging
└── ...
```

## 🎯 Penjelasan Kegunaan Masing-masing Folder

### 📂 `/src/app/` - App Router (Next.js 15)

**Fungsi:** Mengatur routing dan struktur halaman menggunakan App Router Next.js 15

- `layout.tsx`: Layout utama yang membungkus semua halaman
- `page.tsx`: Homepage utama dengan lazy loading untuk performa optimal
- `projects/page.tsx`: Halaman "All Projects" dengan animasi dan navigasi SPA
- `api/`: API routes untuk fitur backend (download, OG image, monitoring)

### 📂 `/src/components/features/` - Feature-based Components

**Fungsi:** Komponen yang diorganisir berdasarkan fitur/halaman untuk maintainability

- **`home/`**: Semua komponen khusus homepage
  - `home-section.tsx`: Section utama homepage dengan tech stack
  - `about-section.tsx`: Section about/bio
  - `hero-content.tsx`: Hero section dengan animasi
  - `tech-stack.tsx`: Display teknologi yang dikuasai
  - `components.ts`: Lazy loading configuration untuk performa
- **`projects/`**: Komponen khusus proyek
  - `project-section.tsx`: Section projects di homepage dengan "Show More" navigation

### 📂 `/src/components/layout/` - Layout Components

**Fungsi:** Komponen yang digunakan untuk layout dan struktur halaman

- `navbar.tsx`: Navigation bar dengan conditional rendering (hidden di /projects)

### 📂 `/src/components/ui/` - Reusable UI Components

**Fungsi:** Komponen UI yang dapat digunakan kembali di berbagai tempat

- `preloader.tsx`: Animasi loading TZ-branded untuk SPA navigation
- `animate-on-scroll.tsx`: Animasi saat scroll untuk reveal effects
- `page-transition.tsx`: Transisi antar halaman
- `shiny-button.tsx`: Button dengan efek glossy
- Dan komponen UI lainnya untuk konsistensi design

### 📂 `/src/components/magicui/` - Third-party UI

**Fungsi:** Komponen UI dari library eksternal atau template

- `animated-theme-toggler.tsx`: Toggle dark/light mode dengan animasi
- `morphing-text.tsx`: Text dengan efek morphing

### 📂 `/src/components/providers/` - Context Providers

**Fungsi:** React Context providers untuk state management global

- `providers.tsx`: Root provider yang menggabungkan semua providers
- `navigation-provider.tsx`: Context untuk navigation state
- `smooth-scroll-provider.tsx`: Context untuk smooth scrolling

### 📂 `/src/data/` - Data Management

**Fungsi:** Centralized data storage dan type definitions

- `projects-data.ts`: Data semua project dengan TypeScript interfaces

### 📂 `/src/lib/` - Utility Libraries

**Fungsi:** Utility functions, types, dan constants yang digunakan di seluruh aplikasi

- `types.ts`: TypeScript type definitions untuk consistency
- `constants.ts`: Application constants (routes, durations, breakpoints)
- `utils.ts`: Helper functions (cn utility untuk className merging)
- `lazy-load.tsx`: Utilities untuk lazy loading components
- `safe-console.ts`: Safe console logging untuk production

### 📂 `/src/hooks/` - Custom React Hooks

**Fungsi:** Custom hooks untuk logic yang dapat digunakan kembali

- `use-smooth-scroll.ts`: Hook untuk smooth scrolling functionality

## 🚀 Keuntungan Struktur Baru

### 1. **Maintainability**

- Komponen diorganisir berdasarkan fitur, mudah mencari dan mengubah
- Separation of concerns yang jelas
- Import paths yang konsisten dengan alias `@/`

### 2. **Scalability**

- Mudah menambah fitur baru tanpa mengubah struktur existing
- Feature-based organization memungkinkan tim development yang lebih besar
- Clear boundaries antar components

### 3. **Performance**

- Lazy loading pada level component dan route
- Tree shaking optimization dengan proper imports
- Optimal bundle splitting

### 4. **Developer Experience**

- TypeScript types yang terpusat di `/lib/types.ts`
- Constants terpusat di `/lib/constants.ts`
- Clear naming conventions dan folder structure

### 5. **Next.js 15 Best Practices**

- Menggunakan App Router secara optimal
- Server/Client components separation
- Proper API routes organization

## 🔧 Panduan Development

### Menambah Fitur Baru:

1. Buat folder di `/src/components/features/[nama-fitur]/`
2. Tambahkan types di `/src/lib/types.ts` jika diperlukan
3. Tambahkan constants di `/src/lib/constants.ts` jika diperlukan
4. Buat route di `/src/app/[nama-fitur]/page.tsx`

### Menambah Component UI:

1. Buat di `/src/components/ui/[nama-component].tsx`
2. Export di index file jika diperlukan
3. Dokumentasikan props dan usage

### Menambah Data:

1. Tambahkan di `/src/data/[nama-data].ts`
2. Define types di `/src/lib/types.ts`
3. Import menggunakan alias `@/data/[nama-data]`

Struktur ini mengikuti best practices industri dan memudahkan maintenance jangka panjang! 🎉

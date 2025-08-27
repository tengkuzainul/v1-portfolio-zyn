# Folder Restructuring Plan - Next.js 15 Best Practices

## Current Issues Identified:

1. Components mixed between `/app/components` and `/src/components`
2. Pages structure inconsistent (`/app/pages/home` should be direct in `/app`)
3. Duplicate/unused files (multiple preloader versions)
4. API routes properly placed but could be organized better
5. Utils scattered across different locations

## Proposed New Structure:

```
src/
├── app/                          # Next.js 15 App Router
│   ├── (routes)/                 # Route groups for organization
│   │   ├── home/                 # Homepage route
│   │   ├── projects/             # Projects routes
│   │   └── api/                  # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── loading.tsx              # Global loading UI
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components
│   ├── features/                # Feature-specific components
│   ├── layout/                  # Layout components (navbar, footer)
│   └── providers/               # Context providers
├── lib/                         # Utility functions
│   ├── utils.ts                 # General utilities
│   ├── constants.ts             # App constants
│   └── types.ts                 # TypeScript type definitions
├── hooks/                       # Custom React hooks
├── styles/                      # Additional CSS files
└── data/                        # Static data files
```

## Action Plan:

1. Remove duplicate/unused files
2. Reorganize components
3. Move utilities to proper locations
4. Update import paths
5. Create comprehensive documentation

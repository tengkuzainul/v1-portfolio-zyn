# Deployment Guide

## Initial Setup

### 1. Private CV Files

Your CV files are stored in the `private/assets` directory, which is not exposed to the web and is not included in the Git repository.

#### Local Development

1. Place your CV file (`tengku_zainul_resume.pdf`) in the `private/assets` folder.
2. The API route at `api/downloads` will handle secure file serving.

#### Deployment to Hosting Services

When deploying to hosting services like Vercel:

- **Option 1**: Deploy with the private folder

  - For Vercel: Include the private folder in your deployment
  - Make sure the file exists at `private/assets/tengku_zainul_resume.pdf`

- **Option 2**: Use environment variables for different storage locations
  - For more advanced setups, modify the API route to use environment-specific storage
    (e.g., S3, Google Cloud Storage)

### 2. Security Notes

The current implementation includes:

1. Filename validation to prevent path traversal attacks
2. Whitelist approach - only specifically named files can be accessed
3. Restriction to only serve .pdf files
4. API route authentication can be added for more security

### 3. Adding More Files

To add more downloadable files:

1. Place the files in the `private/assets` directory
2. Update the whitelist in `api/downloads/route.ts`:

```typescript
const allowedFiles = ["tengku_zainul_resume.pdf", "another_file.pdf"];
```

## Deployment with GitHub Actions and Vercel

### Prerequisites

1. A GitHub account
2. A Vercel account
3. Repository pushed to GitHub

### Setting up Vercel

1. Create a new project in Vercel and link it to your GitHub repository.
2. In your Vercel dashboard, go to Settings > General > Project ID and copy the Project ID.
3. Go to Settings > General > Organization ID and copy the Organization ID.
4. Go to Settings > Tokens and create a new token with full scope. Copy this token.

### Setting up GitHub Repository Secrets

Add the following secrets to your GitHub repository:

1. Go to your GitHub repository > Settings > Secrets and variables > Actions
2. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

### Automated Deployment Process

The deployment process is automated using GitHub Actions:

- The `.github/workflows/production-deploy.yml` workflow will deploy to production when changes are pushed to the `main` branch.
- The `.github/workflows/preview-deploy.yml` workflow will deploy a preview when a pull request is opened or updated.

### Manual Deployment

If you need to deploy manually, you can run:

```bash
npm install -g vercel
vercel login
npm run vercel-deploy
```

## Key Files for Deployment

- `.github/workflows/production-deploy.yml`: Production deployment workflow
- `.github/workflows/preview-deploy.yml`: Preview deployment workflow
- `vercel.json`: Vercel configuration file with security headers and caching rules
- `next.config.ts`: Next.js configuration
- `src/app/api/og/route.tsx`: Open Graph image generation endpoint for social sharing

## Post-Deployment Checklist

After deployment, verify:

1. The website loads correctly
2. All links and assets work properly
3. The CV download functionality works
4. The website is responsive on different devices
5. SEO meta tags are properly generated
6. Open Graph images render correctly

## SEO and Performance

The following files have been set up for SEO:

- `src/app/layout.tsx`: Contains metadata for SEO
- `src/app/sitemap.ts`: Generates a sitemap
- `src/app/robots.ts`: Configures robots.txt
- `src/app/api/og/route.tsx`: Dynamically generates Open Graph images

## Troubleshooting

If you encounter deployment issues:

1. Check the GitHub Actions logs for errors
2. Verify that all secrets are correctly set in the GitHub repository
3. Ensure the Vercel project is properly linked to the GitHub repository
4. Check that the private folder with CV files is included in the deployment

For any other issues, refer to the Vercel documentation or contact support.

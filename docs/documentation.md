# Portfolio Website Documentation

This document contains all the necessary documentation for maintaining, developing, and deploying the portfolio website.

## Table of Contents

- [Deployment Guide](#deployment-guide)
- [Security Guidelines](#security-guidelines)
- [Developer Guide](#developer-guide)
- [Private Assets Management](#private-assets-management)
- [Troubleshooting](#troubleshooting)

---

## Deployment Guide

### Simple Deployment to Vercel

For this portfolio website, we use direct deployment to Vercel without complex automated workflows.

#### Method 1: Deployment from CLI (Easiest)

1. Make sure you've logged in to Vercel CLI:
   ```bash
   vercel login
   ```

2. Run the command for production deployment:
   ```bash
   npm run deploy
   ```
   or directly:
   ```bash
   vercel --prod
   ```

   This will automatically:
   - Build the project
   - Upload to Vercel
   - Deploy to the production URL

#### Method 2: Deployment from Vercel Dashboard

1. Push changes to the GitHub repository
2. Login to [Vercel Dashboard](https://vercel.com)
3. Select your portfolio project
4. Click "Deploy" to deploy the latest version

### Initial Setup for Private Files

Your CV files are stored in the `private/assets` directory, which is not exposed to the web and is not included in the Git repository.

#### Local Development

1. Place your CV file (`tengku_zainul_resume.pdf`) in the `private/assets` folder
2. The API route at `api/downloads` will handle secure file serving

#### Deployment to Hosting Services

When deploying to Vercel:

- Include the private folder in your deployment
- Make sure the file exists at `private/assets/tengku_zainul_resume.pdf`

### Post-Deployment Checklist

After deployment, verify:

1. The website loads correctly
2. All links and assets work properly
3. The CV download functionality works
4. The website is responsive on different devices
5. SEO meta tags are properly generated
6. Open Graph images render correctly

---

## Security Guidelines

This section contains security guidelines to ensure the project is properly protected and doesn't expose sensitive data.

### Secrets and Credentials Management

- **NEVER** commit the following files to the repository:
  - `.env.*` files containing credentials
  - Private keys, certificates, or security credentials
  - API access tokens or authentication tokens
  - Passwords, seed phrases, or other login information

- **ALWAYS** use environment variables for sensitive information:
  - Use `.env.local` for local development (never committed)
  - Use Vercel Environment Variables for deployment

### Code Protection

- Avoid hardcoding sensitive information in the code
- Use environment variables accessed via `process.env`
- Verify and sanitize all user input
- Use Content Security Policy (CSP) to prevent XSS

### Safe Git Practices

- Check commits before pushing to ensure no sensitive data is included
- Use the updated `.gitignore` file
- If you accidentally commit sensitive data:
  1. Immediately change the exposed credentials
  2. Use `git filter-branch` or BFG Repo-Cleaner to remove sensitive data from history

### API and Endpoint Protection

- Implement rate limiting to prevent abuse
- Validate all inputs server-side
- Use proper CORS settings
- For client-side API keys, use a proxy server to protect the original key

---

## Developer Guide

### Avoiding Deployment Errors

Follow these guidelines to ensure successful deployment:

#### Before Committing & Pushing:

```bash
# Run linting and fix issues
npm run lint:fix

# Build locally to ensure no errors
npm run build
```

### Branch Structure

- `master` branch is used for production deployments

### ESLint Configuration

The ESLint configuration has been set up to minimize build-breaking errors. If you have complex type changes, consider using directives like:

```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```

### Common Error Fixes

#### Fixing ESLint Errors

1. **For unused variables**:
   ```tsx
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const unusedVar = "value";
   ```

2. **For using 'any' type**:
   ```tsx
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const data: any = fetchData();
   ```

#### Fixing TypeScript Errors

1. **Handling React props errors**:
   ```tsx
   interface ButtonProps {
     label: string;
     onClick?: () => void;  // Use optional (?) for non-required props
   }
   ```

---

## Private Assets Management

This section explains how to manage private assets like CV files.

### Private Directory Structure

- `private/assets/` - Stores private files like your CV
- `private/credentials/` - For local credential storage (never committed)
- `private/certificates/` - For local certificate storage (never committed)

### Security Implementation

The current implementation includes:

1. Filename validation to prevent path traversal attacks
2. Whitelist approach - only specifically named files can be accessed
3. Restriction to only serve .pdf files
4. API route authentication can be added for more security

### Adding More Files

To add more downloadable files:

1. Place the files in the `private/assets` directory
2. Update the whitelist in `api/downloads/route.ts`:

```typescript
const allowedFiles = ["tengku_zainul_resume.pdf", "another_file.pdf"];
```

---

## Troubleshooting

### Deployment Issues

If you encounter issues during deployment:

1. **Build errors**: Run `npm run build` locally to check for errors
2. **Linting errors**: Run `npm run lint:fix` to fix issues
3. **TypeScript errors**: Add appropriate type annotations or use `// @ts-ignore` for specific lines

### Common Deployment Failure Reasons

1. **Invalid or expired Vercel token**
2. **Unfixed ESLint or TypeScript errors**
3. **Conflicting or incompatible dependencies**
4. **Missing environment variables**
5. **Memory limit exceeded during build process**

Always test the build locally before pushing to GitHub!

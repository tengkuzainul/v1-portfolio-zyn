# Deployment Instructions

## Private CV Files

Your CV files are stored in the `private/assets` directory, which is not exposed to the web and is not included in the Git repository.

### Local Development

1. Place your CV file (`tengku_zainul_resume.pdf`) in the `private/assets` folder.
2. The API route at `api/downloads` will handle secure file serving.

### Deployment to Hosting Services

When deploying to hosting services like Vercel or Netlify:

#### Option 1: Deploy with the private folder

- For Vercel: Add the private folder in your deployment
- Make sure the file exists at `private/assets/tengku_zainul_resume.pdf`

#### Option 2: Use environment variables to specify different storage locations

- For more advanced setups, modify the API route to use environment-specific storage
  (e.g., S3, Google Cloud Storage)

## Security Notes

The current implementation includes:

1. Filename validation to prevent path traversal attacks
2. Whitelist approach - only specifically named files can be accessed
3. Restriction to only serve .pdf files
4. API route authentication can be added for more security

## Adding More Files

To add more downloadable files:

1. Place the files in the `private/assets` directory
2. Update the whitelist in `api/downloads/route.ts`:

```typescript
const allowedFiles = ["tengku_zainul_resume.pdf", "another_file.pdf"];
```

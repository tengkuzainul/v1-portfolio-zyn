# Private Assets Folder

This folder contains private assets that should not be publicly accessible directly.

## Contents:

- assets/
  - tengku_zainul_resume.pdf (your actual CV file)

## Security Notice

Files in this folder are not served directly by the Next.js static file server.
Instead, they are accessed through a secure API route that implements proper access controls.

## How to Use

Place your actual CV file (`tengku_zainul_resume.pdf`) in the assets/ folder.
The file will be served through the `/api/downloads` endpoint when requested.

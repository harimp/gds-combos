# Deployment Guide for GitHub Pages

This guide will help you deploy the Game Dev Story Combination Table to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. This project code

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository `gds-combos` (or any name you prefer)
5. Make sure it's set to "Public"
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### 2. Push Your Code to GitHub

In your terminal/command prompt, run these commands from your project directory:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Game Dev Story Combination Table"

# Add your GitHub repository as origin (replace [username] with your GitHub username)
git remote add origin https://github.com/[username]/gds-combos.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on the "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically trigger and deploy your site

### 4. Wait for Deployment

1. Go to the "Actions" tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 2-5 minutes)
4. Once complete, your site will be available at: `https://[username].github.io/gds-combos/`

## Updating Your Site

To update your site after making changes:

1. Make your changes to the code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push
   ```
3. The GitHub Action will automatically rebuild and redeploy your site

## Troubleshooting

### Build Fails
- Check the Actions tab for error messages
- Ensure all dependencies are listed in `package.json`
- Make sure the build command works locally

### Site Not Loading
- Check that GitHub Pages is enabled in repository settings
- Verify the correct branch is selected for deployment
- Wait a few minutes after deployment completes

### 404 Errors
- The `404.html` file should handle client-side routing
- Make sure the base path in `vite.config.ts` matches your repository name

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Enable "Enforce HTTPS" in the Pages settings

## Support

If you encounter issues:
1. Check the GitHub Actions logs for detailed error messages
2. Ensure your repository is public (private repos require GitHub Pro for Pages)
3. Verify all file paths and configurations are correct

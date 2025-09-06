#!/bin/bash

# Deployment script for GitHub Pages
# This script helps automate the deployment process

echo "🚀 Starting deployment process for Game Dev Story Combination Table..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Get commit message from user or use default
if [ -z "$1" ]; then
    COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi

echo "💾 Committing changes with message: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found!"
    echo "Please add your GitHub repository as origin:"
    echo "git remote add origin https://github.com/[username]/gds-combos.git"
    echo "Replace [username] with your actual GitHub username"
    exit 1
fi

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo "✅ Deployment initiated!"
echo "🔗 Check your GitHub Actions at: https://github.com/[username]/gds-combos/actions"
echo "📱 Your site will be available at: https://[username].github.io/gds-combos/"
echo "⏱️  Deployment usually takes 2-5 minutes to complete."

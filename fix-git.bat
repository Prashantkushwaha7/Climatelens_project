@echo off
echo Adding all files to Git...
git add .

echo Creating initial commit...
git commit -m "Initial commit: Climate Lens project setup"

echo Setting up main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo Git setup complete!
pause
@echo off
title Pushing R.E. Rithvik Portfolio to GitHub
echo ========================================================
echo       R.E. Rithvik Portfolio - Push to GitHub
echo       Target: https://github.com/rithvikgoud887-png/rithvik-portfolio.git
echo ========================================================
echo.

set REPO_URL=https://github.com/rithvikgoud887-png/rithvik-portfolio.git
set GIT_BIN=C:\Users\rithv\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe

echo Step 1: Configuring remote origin...
"%GIT_BIN%" remote remove origin 2>nul
"%GIT_BIN%" remote add origin %REPO_URL%

echo Step 2: Ensuring main branch...
"%GIT_BIN%" branch -M main

echo.
echo Step 3: Pushing commits to GitHub...
echo (If prompted, please sign in via your browser or enter your GitHub credentials)
echo.

"%GIT_BIN%" push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! Your portfolio is now live on GitHub:
    echo   https://github.com/rithvikgoud887-png/rithvik-portfolio
    echo ========================================================
) else (
    echo.
    echo If authentication failed, please generate a Personal Access Token on GitHub
    echo (Settings - Developer settings - Personal access tokens) and paste it as the password.
)
echo.
pause

@echo off
title SmartLearn LMS Runner
echo ==========================================================
echo           Starting SmartLearn LMS Servers...
echo ==========================================================
echo.
echo Launching Backend server (Port 5000)...
start "SmartLearn Backend API" cmd /k "cd backend && npm run start"

echo Launching Frontend application (Port 3000)...
start "SmartLearn Frontend UI" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================================
echo  Servers are starting in separate terminal windows!
echo  - Backend API: http://localhost:5000
echo  - Frontend Web: http://localhost:3000
echo ==========================================================
echo.
pause

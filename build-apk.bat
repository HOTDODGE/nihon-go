@echo off
chcp 65001 > nul
node "%~dp0scripts\build-apk.mjs"
pause

@echo off
chcp 65001 > nul
node "%~dp0scripts\push-github.mjs"
pause

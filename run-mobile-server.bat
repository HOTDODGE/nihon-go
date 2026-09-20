@echo off
chcp 65001 > nul
title NihonGo! Mobile Access Server

echo ========================================================
echo   NihonGo! 스마트폰 접속용 로컬 네트워크 서버 실행
echo ========================================================
echo.
echo [안내] 스마트폰이 이 컴퓨터와 동일한 Wi-Fi 공유기에 연결되어 있어야 합니다.
echo.

cd /d "%~dp0"

echo [서버 시작 중...] 잠시만 기다려주세요.
echo 아래 화면에 Network: http://192.168.x.x:5173 주소가 뜨면
echo 스마트폰 브라우저로 해당 주소에 접속하시면 됩니다!
echo.
echo --------------------------------------------------------

call npm run dev -- --host

pause

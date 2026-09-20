@echo off
chcp 65001 > nul
title Piper Japanese AI TTS Model Downloader

echo ========================================================
echo   NihonGo! 일본어 AI 경량 모델 (Tsukuyomi-chan ONNX) 다운로더
echo ========================================================
echo.

cd /d "%~dp0"

if not exist "public\models" (
    mkdir "public\models"
)

echo [1/2] 모델 설정 파일(JSON) 다운로드 중...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://huggingface.co/ayousanz/piper-plus-tsukuyomi-chan/raw/main/config.json', 'public\models\tsukuyomi-chan.onnx.json')"

echo [2/2] 경량 신경망 AI 모델(.onnx, 약 38MB) 다운로드 중...
echo       (네트워크 상태에 따라 10~30초 소요됩니다)
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://huggingface.co/ayousanz/piper-plus-tsukuyomi-chan/resolve/main/tsukuyomi-chan-6lang-fp16.onnx', 'public\models\tsukuyomi-chan.onnx')"

if exist "public\models\tsukuyomi-chan.onnx" (
    echo.
    echo ========================================================
    echo [성공] 일본어 AI 경량 모델(츠쿠요미짱 ONNX) 다운로드가 완료되었습니다!
    echo       저장 위치: public\models\tsukuyomi-chan.onnx
    echo ========================================================
) else (
    echo.
    echo [오류] 모델 다운로드 중 문제가 발생했습니다. 네트워크 연결을 확인해주세요.
)

echo.
pause

# NihonGo! Android APK Builder (PowerShell Engine)
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "      NihonGo! 안드로이드 APK 파일 자동 생성기" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$RootPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$RootPath\.."

# 1. Web Build
Write-Host "[1/4] 최신 웹 애플리케이션 빌드 중..." -ForegroundColor Yellow
& npm.cmd run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[오류] 웹 빌드 실패. 오류 메시지를 확인하세요." -ForegroundColor Red
    exit 1
}

# 2. Capacitor Android Project Check
if (-not (Test-Path "android")) {
    Write-Host "`n[2/4] 최초 1회: 안드로이드 네이티브 프로젝트 생성 중..." -ForegroundColor Yellow
    & npx.cmd cap add android
}

# 3. Sync Web Assets
Write-Host "`n[3/4] 최신 파일 동기화 중 (Capacitor Sync)..." -ForegroundColor Yellow
& npx.cmd cap sync android

# 4. Gradle Build APK
Write-Host "`n[4/4] 안드로이드 APK 파일 컴파일 중 (Gradle Build)..." -ForegroundColor Yellow
Write-Host "      (최초 실행 시 라이브러리 다운로드로 수 분 소요될 수 있습니다)" -ForegroundColor DarkGray

Set-Location "android"
& .\gradlew.bat assembleDebug
$gradleExit = $LASTEXITCODE
Set-Location ".."

$apkSrc = "android\app\build\outputs\apk\debug\app-debug.apk"
$releaseDir = "release"
$apkDest = "$releaseDir\NihonGo.apk"

if ($gradleExit -eq 0 -and (Test-Path $apkSrc)) {
    if (-not (Test-Path $releaseDir)) {
        New-Item -ItemType Directory -Path $releaseDir | Out-Null
    }
    Copy-Item -Path $apkSrc -Destination $apkDest -Force
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host " [성공] 스마트폰 설치용 APK 파일이 성공적으로 생성되었습니다!" -ForegroundColor Green
    Write-Host " 파일 위치: $(Get-Location)\$apkDest" -ForegroundColor White
    Write-Host "========================================================`n" -ForegroundColor Green
    Write-Host "완성된 폴더를 탐색기로 엽니다..." -ForegroundColor Cyan
    Invoke-Item $releaseDir
} else {
    Write-Host "`n========================================================" -ForegroundColor Magenta
    Write-Host " [안내] CLI 컴파일 환경(JDK 또는 Android SDK)이 없거나" -ForegroundColor Magenta
    Write-Host "       빌드 오류가 발생하여 [Android Studio]를 실행합니다." -ForegroundColor Magenta
    Write-Host "" -ForegroundColor Magenta
    Write-Host " Android Studio 상단 메뉴: Build > Build APK(s) 를 클릭하시면" -ForegroundColor White
    Write-Host " 1분 만에 스마트폰용 APK 파일이 생성됩니다." -ForegroundColor White
    Write-Host "========================================================`n" -ForegroundColor Magenta
    & npx.cmd cap open android
}

image.png# Backend Server Status Check Script
# Usage: .\check-backend.ps1

Write-Host "`n=== Backend Server Status Check ===" -ForegroundColor Cyan
Write-Host ""

# Method 1: Health Endpoint Check
Write-Host "1. Checking Health Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✓ Server is RUNNING" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Response: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Server is NOT RUNNING" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Method 2: Port Check
Write-Host "2. Checking Port 3000..." -ForegroundColor Yellow
$portCheck = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($portCheck) {
    Write-Host "   ✓ Port 3000 is LISTENING" -ForegroundColor Green
    $portCheck | Select-Object LocalAddress, LocalPort, State, OwningProcess | Format-Table
} else {
    Write-Host "   ✗ Port 3000 is NOT in use" -ForegroundColor Red
}

Write-Host ""

# Method 3: Process Check
Write-Host "3. Checking Node.js Processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "   ✓ Found Node.js processes:" -ForegroundColor Green
    $nodeProcesses | Select-Object Id, ProcessName, StartTime | Format-Table
} else {
    Write-Host "   ⚠ No Node.js processes found" -ForegroundColor Yellow
}

Write-Host ""

# Method 4: API Endpoint Test
Write-Host "4. Testing API Endpoint..." -ForegroundColor Yellow
try {
    $apiResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/sweets" -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✓ API Endpoint is responding" -ForegroundColor Green
    Write-Host "   GET /api/sweets - Status: $($apiResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ API Endpoint test failed" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Backend URL: http://localhost:3000" -ForegroundColor White
Write-Host "Health Check: http://localhost:3000/health" -ForegroundColor White
Write-Host "API Endpoint: http://localhost:3000/api/sweets" -ForegroundColor White
Write-Host ""


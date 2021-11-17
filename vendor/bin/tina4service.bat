@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../tina4stack/tina4php/bin/tina4service
php "%BIN_TARGET%" %*

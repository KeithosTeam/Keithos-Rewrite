@echo off

set force=0
set verbose=0
set help=0

if /i "%~1"=="/?" goto :help
if /i "%~1"=="-h" goto :help
if /i "%~1"=="--help" goto :help

if /i "%~1"=="/f" force = 1
if /i "%~1"=="-f" force = 1
if /i "%~1"=="--force" force = 1

echo %force%

if %force==1 del .\logs\*

:help
    echo "Usage ./clearlogs.sh [OPTIONS]"
    echo "Removes the log files for the Keithos bot."
    echo
    echo
    echo "  -h, --help          Shows this help dialog."
    echo "  -f, --force         Forces the removal of the logs without any prompts"
    echo "  -v, --verbose       Shows what files the scrpit has removed"
    echo
    echo
    echo "  This program has no warranty, use at your own risk lol."
    echo "  Creator: MCorange" 
    exit 0
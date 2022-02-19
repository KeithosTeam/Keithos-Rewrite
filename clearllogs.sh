#!/bin/bash

force=0
verbose=0
help=0

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -h|--help) help=1;;
        -f|--force) force=1;;
        -v|--verbose) verbose=1 ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [ $help = 1 ]
then 
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
fi

if [ $force = 0 ]
then
    echo "Clearing all logs! Are you sure? (yes or no): "
    read -r conf
fi

if [ $force = 1 ] || [ $conf = "yes" ] 
then
    if [ $verbose = 1 ]
    then
        rm -fv  ./logs/*
    elif [ $verbose = 0 ]
    then
        rm -f  ./logs/*
    fi
fi

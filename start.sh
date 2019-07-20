#!/bin/bash
echo "note: $(tput bold )$(tput setaf 1)stop the Data streamer only using the command:"

echo "                $(tput sgr 0 1)$(tput bold )$(tput setaf 2)ctrl + c" 

echo "$(tput sgr0)"

sleep 2

trap finish EXIT SIGINT SIGTERM

function finish {
    echo "Shutting down Data streamer safely..."
    echo " "
    echo " "
    taskkill //f //im node.exe
    sleep 2
    EXIT
}
echo "Data streamer starting...."

taskkill //f //im node.exe

cd ./scripts

./client.sh &

./server.sh

#!/bin/bash
echo "note: $(tput bold )$(tput setaf 1)stop the video streamer only using the command:"

echo "                $(tput sgr 0 1)$(tput bold )$(tput setaf 2)ctrl + c" 

echo "$(tput sgr0)"

sleep 3

trap finish EXIT SIGINT SIGTERM

function finish {
  # Your cleanup code here
    taskkill //f //im node.exe
    EXIT
}
echo "Video streamer starting...."

taskkill //f //im node.exe


./client.sh &
./server.sh

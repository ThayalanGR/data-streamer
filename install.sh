#!/bin/bash
echo "Video streamer Installing in your system..."

echo " "

echo "Installing video streamer server..."

cd ./server

npm install

cd ..

echo "video streamer server installed successfully."

echo " "

echo "installing video streamer web-front-end... "

cd ./web-front-end

npm install

cd ..

echo "  "

echo "  "

echo "video streamer web-front-end installed successfully."

echo "  "

echo "  "

echo "execute the $(tput bold)$(tput sgr 0 1)$(tput setaf 2)start.sh$(tput sgr 0) script to start the application."

exec $SHELL
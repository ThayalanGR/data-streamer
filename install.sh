#!/bin/bash
echo "Data streamer Installing in your system..."

echo " "

echo "Installing Data streamer server..."

cd ./server

npm install

cd ..

echo "Data streamer server installed successfully."

echo " "

echo "installing Data streamer web client's necessary packages... "

cd ./client

npm install

echo " "

echo "Installation complete!"

echo " "

echo "Building web client"

npm run build

echo "  "

echo "Build completed!"

cd ..

echo "  "

echo "  "

echo "execute the $(tput bold)$(tput sgr 0 1)$(tput setaf 2)start.sh$(tput sgr 0) script to start the application."

exec $SHELL
#!/bin/bash
echo "Video streamer Installing in your system...."

echo "Installing ***server***"


# dir=$pwd
# echo $dir


cd ./server

npm install

cd ..

echo "video streamer server installed successfully."

echo " "

echo "installing video streamer web-front-end..... "

# exec $SHELL
cd ./web-front-end

npm install

cd ..

echo "video streamer web-front-end installed successfully."

echo "  "

echo "  "

echo "execute the 'start.sh' script to start the application"

exec $SHELL

# echo "This script has just run another script."
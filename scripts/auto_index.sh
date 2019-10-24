#!/bin/bash

function help() {
  # echo "Automatically creates index.js files for ../src/components"
  echo "auto_index.sh"
}

if [[ $1 == "help" ]]; then
  help
  exit 0
fi

scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

cd $scriptsDir
cd ..

while true
do
	# echo "Auto Indexing... hit [CTRL+C] to stop!"
  yarn index
  sleep 60
done

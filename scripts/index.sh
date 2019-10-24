#!/bin/bash

function help() {
  # echo "Creates index.js files for ../src/components"
  echo "index.sh <optionalDirectory> <optionalOptions>"
}

if [[ $1 == "help" ]]; then
  help
  exit 0
fi

scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

cd $scriptsDir
cd ../src/components
if [[ -d ./$1 ]]; then
  cd ./$1
fi

function createIndex() {
  # echo "indexing $(pwd)"
  local folderList="$(ls -p | sort -r | grep /)"
  local fileList="$(ls -p | sort -r | grep -v /)"
  local importStrings=""
  local exportStrings=""
  for folder in $folderList
  do
    local strToRemove="/"
    local strToReplace=""
    folder="${folder/$strToRemove/$strToReplace}"
    asterisk='*'
    importStrings="import '*' as ${folder} from \"./${folder}\";\n${importStrings}"
    exportStrings="    ${folder},\n${exportStrings}"
  done
  for file in $fileList
  do
    if [[ $file == *".jsx" ]]; then
      local strToRemove=".jsx"
      local strToReplace=""
      file="${file/$strToRemove/$strToReplace}"
      importStrings="import ${file} from \"./${file}\";\n${importStrings}"
      exportStrings="    ${file},\n${exportStrings}"
    fi
  done
  echo -e $importStrings > ./index.js
  indexFile=$(sed "s/'//g" ./index.js)
  echo "$indexFile" > ./index.js
  echo -e "\nexport {\n${exportStrings}}" >> ./index.js
}

function createIndexDFS() {
  createIndex
  local folderList="$(ls -p | grep /)"
  if [[ $folderList != "" ]]; then
    for folder in $folderList
    do
      cd $folder
      createIndexDFS
      cd ..
    done
  fi
}

if [[ $(pwd) != *"src"* ]]; then
  echo "Gen script must be ran within a src folder"
elif [[ $@ == *"--recursive"* || $@ == *"-r"* ]]; then
  createIndexDFS
else
  createIndex
fi

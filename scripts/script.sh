#!/bin/bash
scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

function help() {
  echo "------------------------------------"
  echo "script.sh <scriptName> <scriptArgs>"
  echo "------------------------------------"
  scripts=$(ls $scriptsDir)
  for script in $scripts
  do
      if [[ $script != "script.sh" && -f $scriptsDir/$script && $script == *".sh" ]]
      then
        scriptHelp=$($scriptsDir/$script help)
        echo "$scriptHelp"
      fi
  done
  echo "------------------------------------"
  exit 0
}

if [[ $1 == "help" ]]; then
  help
fi


scriptFile=${scriptsDir}/${1}.sh
if [[ -f ${scriptFile} ]]; then
  ${scriptFile} $(echo "${@:2}")
else
  echo "${scriptFile} does not exist!"
  help
fi

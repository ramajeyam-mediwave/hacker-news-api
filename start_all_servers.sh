#!/bin/sh

# README:
# needs tmux for this to work
# all this does is it goes into the services folder and runs the services
# within tmux
# tmux a -t maia-server
# use above to connect to tmux session

# change to your project name
SESSION_NAME='hacker-news-api'
FOLDER="$PWD/services" # assuming script is run as contrib/start_all_servers.sh
OLD="$PWD"

# start base session
tmux new-session -s $SESSION_NAME -d

# run only primary and secondary services
count=1
for service_folder in "$FOLDER"/*
do
  service_name=$(basename $service_folder)
  if [ "$service_name" = 'primary_database' ] || [ "$service_name" = 'secondary_database' ]
  then
    echo "Running :: $service_name"
    cd $service_folder
    tmux new-window -t $SESSION_NAME:$count -n $service_name && tmux send-keys -t $SESSION_NAME:$count "npm start" C-m
    count=`expr $count + 1`
  fi
done

tmux a -t hacker-news-api


exit 0

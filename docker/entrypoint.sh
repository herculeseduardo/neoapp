#!/bin/bash

if [ -n "$WAIT_FOR_HOSTS" ]; then

    hosts=$(echo $WAIT_FOR_HOSTS | tr ";" "\n")

    for addr in $hosts
    do
        echo "Host => [$addr]"
    done

    for addr in $hosts
    do
        ip_and_port=$(echo $addr | tr ":" " ")
        until nc -z $ip_and_port
        do
            echo "Esperando serviço.. [$ip_and_port]"
            sleep 1
        done 2> /dev/null
    done

fi 

# Init application

if [ -z $DEBUG_PORT ]
then
  echo "*** DEBUG_PORT no value ***"
elif [ -n $DEBUG_PORT ]
then
  seq="true"
fi

if [ -z $SEQUELIZE ]
then
  echo "*** SEQUELIZE no value ***"
elif [ -n $SEQUELIZE ]
then
  seq=$SEQUELIZE
fi

case $seq in
   "migrate") 
	   echo "Execute $seq sequelize"
       npm run db:migrate
       ;;

   "true") 
	   echo "Execute $seq."       
	   npm run debug
	   ;;
   *)
	   echo "$seq"
	   npm run start;;
esac

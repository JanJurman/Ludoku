#!/bin/bash

counter=0;
while IFS='' read -r line || [[ -n "$line" ]]; do
    echo "{ sudoku: \"$line\" }," | tr -d '\r' >> output.txt
    ((counter++))
    if(( $counter == 1000 )); then
    	break;
    fi
done < "$1"
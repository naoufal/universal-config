#!/bin/bash

examples=("browserify" "webpack")

for example in ${examples[@]}
do
  path=./examples/$example/node_modules/universal-config

  # Setup folders
  mkdir -p ./examples/$example/node_modules
  mkdir -p $path
  mkdir -p $path/lib
  mkdir -p $path/node_modules
  mkdir -p $path/node_modules/envify

  # Copy lib
  cp lib/* $path/lib/
  cp package.json $path
  cp -r node_modules/envify $path/node_modules/envify
done

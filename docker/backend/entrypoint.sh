#!/bin/bash

if [ -d "/usr/src/app/node_modules" ]; then
  echo "Node modules found, skipping install"
else
  echo "Node modules not found, running npm install"
  npm install
fi

# if [ -d "/usr/src/app/dist" ]; then
#   echo "TypeScript build found, skipping build"
# else
  echo "running npm run build"
  npm run build
# fi

echo "Starting application"
node dist/src/index.js
#!/bin/bash
if [[ -d ./dist ]]
then
    npx concurrently "nodemon node app.js"
else
    npm run-script build
    npx nodemon node app.js
fi

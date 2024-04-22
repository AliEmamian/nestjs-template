#!/bin/sh

apk add --no-cache npm
npm install --production=false
npm run --cache /var/cache typeorm:run


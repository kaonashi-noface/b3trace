#!/bin/bash

rm -rf dist
npm run build
cp -R package.json dist
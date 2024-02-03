#!/bin/bash

# Use the environment variable during runtime
echo "ENV = $ENV"

# Run your application based on the environment variable
if [ "$ENV" == "pro" ]; then
    npm run start:pro
else
    npm run start:dev
fi

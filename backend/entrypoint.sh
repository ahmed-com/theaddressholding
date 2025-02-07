#!/bin/sh
# Run the create-root-user command before starting the application.
echo "Running create-root-user command..."
node dist/main.js create-root-user
echo "Starting NestJS application..."
npm run start:prod

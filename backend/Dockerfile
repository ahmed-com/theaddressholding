# Use an official Node.js image based on Alpine for a small footprint
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy the rest of the application code
COPY . .

# Build the NestJS application 
RUN npm run build

# Expose the port 
EXPOSE 8080

# Copy the entrypoint script and mark it executable
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Use the entrypoint script as the container's command
CMD ["sh", "entrypoint.sh"]
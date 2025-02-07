# Stage 1: Build the Next.js app
FROM node:20-alpine as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy source code and build the application
COPY . .
RUN npm run build

# Stage 2: Run the Next.js app in production mode
FROM node:20-alpine

WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app ./

# Expose the port your Next.js app will run on
EXPOSE 3000

# Start the Next.js application (assumes "start" runs the production server)
CMD ["npm", "start"]

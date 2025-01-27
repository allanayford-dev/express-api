# Use an official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy only the required source files
COPY src/ ./src/
COPY public/ ./public/

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

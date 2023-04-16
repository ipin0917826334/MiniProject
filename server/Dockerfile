# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm ci

# Copy the rest of the application to the working directory
COPY . .

# Expose port 5001 for the API server
EXPOSE 5001

# Start the Express application
CMD ["npm", "start"]

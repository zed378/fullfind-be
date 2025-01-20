FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Create necessary directories
RUN mkdir -p /app/log /app/uploads /app/uploads/profile /app/uploads/invoice

# Copy package.json and package-lock.json (or equivalent)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]

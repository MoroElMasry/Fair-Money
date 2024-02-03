# Use an official Node.js runtime as a base image
FROM node:21.6.1

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install
Run npm install -g nodemon

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the script
CMD ["./docker_run_script.sh"]
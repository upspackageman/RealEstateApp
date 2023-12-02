# Stage 1: Build the Angular app
FROM node:latest as builder

WORKDIR /app

# Copy only the package.json and package-lock.json files to install dependencies
COPY ./realestatespa/package.json .
COPY ./realestatespa/package-lock.json .

# Copy the rest of the application files
COPY . .

# Install npm dependencies
RUN npm install

# Build the Angular app
RUN npm run build

# Stage 2: Serve the Angular app using Nginx
FROM nginx:latest

# Copy the built Angular app from the builder stage
COPY --from=builder /app/dist/realestatespa /usr/share/nginx/html

EXPOSE 80

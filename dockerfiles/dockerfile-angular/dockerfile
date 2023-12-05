# Stage 1: Build the Angular app
FROM node:latest as builder

WORKDIR /app

# Copy only the package.json and package-lock.json files to install dependencies
COPY ./realestatespa/package.json .
COPY ./realestatespa/package-lock.json .

# Install npm dependencies
RUN npm install --force

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY ./realestatespa .


# Build the Angular app
RUN ng build --configuration=production

# Stage 2: Serve the Angular app using Nginx
FROM nginx:latest

# Copy the built Angular app from the builder stage
COPY --from=builder /app/dist/realestatespa /usr/share/nginx/html

EXPOSE 80

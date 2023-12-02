# Stage 1: Build the Angular application
FROM node:latest as angular
WORKDIR /realestatespa
COPY ./realestatespa/package*.json ./

# Remove the package-lock.json file
#RUN rm -f package-lock.json

# Install Git
RUN apt-get update && apt-get install -y git

# Set proxy configuration for npm
RUN npm config set proxy http://192.168.0.28:8080
#RUN npm config set https-proxy http://your-proxy-server:your-proxy-port

# Install NPM
RUN npm install --force
RUN npm run build --configuration=production --output-path=/usr/share/nginx/html

# Stage 2: Serve the built application
FROM nginx:latest
COPY --from=angular /realestatespa/dist/beverlyward-realtor-client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
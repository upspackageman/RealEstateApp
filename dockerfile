# Stage 1: Build the Angular application
FROM node:16-alpine as angular
WORKDIR /app
COPY . .

# Remove the package-lock.json file
#RUN rm -f package-lock.json

# Install Git
#RUN apt-get update && apt-get install -y git

# Install NPM
RUN npm install 
RUN npm run build --prod

# Stage 2: Serve the built application
FROM nginx:latest
COPY --from=angular /app/dist/beverlyward-realtor-client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

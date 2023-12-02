# Dockerfile for Angular app
FROM nginx:latest

COPY dist/realestatespa /usr/share/nginx/html

EXPOSE 80

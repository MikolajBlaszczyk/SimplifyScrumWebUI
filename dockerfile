# Stage 1: Build the React application
FROM node:22 as build

WORKDIR /app

COPY simplify-scrum/package*.json ./
RUN npm install 

COPY ./simplify-scrum .
RUN npm run build 

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file template
COPY ./nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Copy the entrypoint script
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build the React application
FROM node:22 as build

WORKDIR /app

COPY simplify-scrum/package*.json ./
RUN npm install 

COPY ./simplify-scrum .

ARG REACT_APP_WEB_APP_URL
ARG REACT_APP_SIMPLIFY_API

ENV REACT_APP_WEB_APP_URL $REACT_APP_WEB_APP_URL
ENV REACT_APP_SIMPLIFY_API $REACT_APP_SIMPLIFY_API

RUN npm run build 



FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf.template /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
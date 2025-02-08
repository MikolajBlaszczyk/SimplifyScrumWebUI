#build
FROM node:22 as build

WORKDIR /app



COPY simplify-scrum/package*.json ./
RUN npm install 

ARG REACT_APP_WEB_APP_URL
ENV REACT_APP_WEB_APP_URL $REACT_APP_WEB_APP_URL
ARG REACT_APP_SIMPLIFY_API
ENV REACT_APP_SIMPLIFY_API $REACT_APP_SIMPLIFY_API

COPY ./simplify-scrum .
RUN npm run build 

#production
FROM nginx:stable-alpine as production
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache tzdata
ENV TZ=Europe/Warsaw
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone



COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
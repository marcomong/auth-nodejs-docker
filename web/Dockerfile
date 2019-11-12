FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as produciton-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy the respective nginx configuration files
COPY data/nginx/nginx.conf /etc/nginx/nginx.conf
COPY data/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
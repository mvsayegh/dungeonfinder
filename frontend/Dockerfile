# FROM node:slim as node
# WORKDIR /app
# COPY package.json /app/
# COPY . /app/
# RUN npm install -g npm@latest
# RUN npm install
# ARG env=prod
# RUN npm run build

FROM nginx
COPY ./www/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Porta exposta pelo NGINX
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]

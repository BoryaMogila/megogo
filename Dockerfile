FROM node

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

COPY package.json /var/www/app/
RUN npm install

COPY . /var/www/app

EXPOSE 8081

CMD [ "node", "index.js" ]

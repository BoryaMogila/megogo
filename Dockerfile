FROM node:latest

# Please, check & delete unused files
COPY app app
COPY config config
COPY data data
COPY js js
COPY public public
COPY sass sass

COPY package.json .
COPY spec spec
COPY index.kubernetes.js .
#COPY public/js/markerClustererPlus.js public/js/

# build
RUN npm install

EXPOSE 8081
CMD node index.kubernetes.js
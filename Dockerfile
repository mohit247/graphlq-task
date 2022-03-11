FROM node:17
WORKDIR /usr/src/server

COPY ./ ./
COPY package*.json ./
RUN npm install

EXPOSE 8000
ENV NODE_ENV=production

CMD [ "node", "/src/server.js" ]
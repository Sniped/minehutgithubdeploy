FROM node:12-alpine

WORKDIR /usr/src/app

ADD . .

RUN npm install
RUN npm run tsc

CMD [ "node", "dist/app.js" ]
EXPOSE 3000
FROM node:12-alpine

WORKDIR /usr/src/app

ADD . .

RUN npm install -g typescript
RUN npm install
RUN tsc

CMD [ "node", "dist/app.js" ]
EXPOSE 3000
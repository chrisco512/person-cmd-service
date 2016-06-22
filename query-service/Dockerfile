FROM node:6

RUN mkdir /app
WORKDIR /app

ADD ./package.json /app/package.json
RUN npm install

ADD . /app

ENV NODE_ENV production
ENV PORT 80

ENTRYPOINT  ["npm" "run"]
CMD [ "start:prod" ]

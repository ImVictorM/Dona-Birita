FROM node:16.20.0-alpine3.18

WORKDIR /front-end

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]

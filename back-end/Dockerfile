FROM node:16.20.0-alpine3.18

WORKDIR /back-end

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]

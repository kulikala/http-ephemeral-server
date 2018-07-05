FROM node:alpine

ARG PORT

ENV PORT ${PORT}

COPY . app

WORKDIR /app

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "start"]

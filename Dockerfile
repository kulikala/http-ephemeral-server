FROM node:alpine

COPY . app
WORKDIR /app
RUN npm install

CMD ["npm", "start"]

ARG PORT=80
ENV PORT ${PORT}
EXPOSE ${PORT}

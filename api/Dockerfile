
FROM node:latest

WORKDIR /api

COPY . .

RUN rm -rf node_modules
RUN npm i
RUN npm run build

CMD ["npm", "start"]

EXPOSE 5002
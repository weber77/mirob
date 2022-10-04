FROM node:14.15.0-alpine
WORKDIR /src
COPY --chown=node:node ./package.json ./
RUN apk add --no-cache git
RUN npm install
RUN mkdir /src/dist && chown node:node /src/dist
COPY --chown=node:node . .
EXPOSE 3000
USER node
CMD [ "npm", "start"]
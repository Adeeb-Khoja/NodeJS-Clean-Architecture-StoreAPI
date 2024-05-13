FROM node:21-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
EXPOSE 5000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

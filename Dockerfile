FROM node:10
WORKDIR /usr/app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 2091
CMD [ "npm", "run", "production"]
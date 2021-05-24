FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 
EXPOSE 8000/tcp

COPY . .

CMD ["npm", "start"]
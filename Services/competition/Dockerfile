FROM node:16
WORKDIR /competition
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5003
CMD [ "npm", "start" ] 

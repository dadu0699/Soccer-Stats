FROM node:16
WORKDIR /team
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD [ "npm", "start" ] 

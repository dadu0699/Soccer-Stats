FROM node:16
WORKDIR /prediction
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5009
CMD [ "npm", "start" ] 

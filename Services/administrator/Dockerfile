# Instalar node version 16
FROM node:16

# Crear una nueva carpeta par alojar nuestro servidor
RUN mkdir -p /usr/src/server-administrator

# Moverme a la carpeta
WORKDIR /usr/src/server-administrator

# Copia el directorio actual dentro de la carpeta actual
COPY . .

# Ejecutar el comando npm install para instalar dependencias
RUN npm install

# Ejecutar el comando para compilar la aplicacion
RUN npm run build

# Expone el puerto 5011
EXPOSE 5011

CMD [ "npm", "start" ]

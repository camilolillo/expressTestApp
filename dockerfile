# Usa la imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]

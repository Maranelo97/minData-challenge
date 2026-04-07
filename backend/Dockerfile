# Usamos Node 20 sobre Alpine para que sea liviano
FROM node:20-alpine

# Instalamos dependencias necesarias para que Prisma funcione en Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# Copiamos los archivos de configuración primero para aprovechar la caché de capas
COPY package*.json ./
COPY prisma ./prisma/

# Instalamos todas las dependencias
RUN npm install

# Copiamos el resto del código (incluyendo el datosHero.json)
COPY . .

# Generamos el cliente de Prisma para que esté disponible en el contenedor
RUN npx prisma generate

# Compilamos el código de TypeScript a JavaScript
RUN npm run build

# Exponemos el puerto de nuestra API
EXPOSE 3000

# Arrancamos la aplicación
CMD ["npm", "run", "start"]
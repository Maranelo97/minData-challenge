# Usamos Node 20 sobre Alpine para que sea liviano
FROM node:20-alpine

# Instalamos dependencias necesarias para Prisma y scripts en Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# 1. Copiamos archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# 2. Instalamos dependencias
RUN npm install

# 3. Copiamos el resto del código (Incluye datosHero.json y los .ts de prisma)
COPY . .

# 4. Generamos el cliente de Prisma
RUN npx prisma generate

# 5. Compilamos TS a JS
RUN npm run build

# 6. Damos permisos de ejecución al script de arranque
RUN chmod +x docker-bootstrap.sh

# Exponemos el puerto de la API
EXPOSE 3000

# IMPORTANTE: Usamos el script de bootstrap para correr migraciones + seeds + server
CMD ["./docker-bootstrap.sh"]
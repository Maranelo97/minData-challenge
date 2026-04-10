#!/bin/sh

# 1. Sincronizar el esquema con la base de datos
echo "Sincronizando esquema de base de datos..."
npx prisma db push

# 2. Crear el usuario administrador (Archivo a)
echo "Creando usuario administrador..."
npx ts-node prisma/create-user.ts # Asumiendo que se llama así el archivo 'a'

# 3. Poblar la base de datos con los Héroes (Archivo seed)
echo "Cargando base de datos de héroes..."
npx prisma db seed

# 4. Iniciar el servidor
echo "Iniciando servidor de The Neon Vanguard..."
npm run start
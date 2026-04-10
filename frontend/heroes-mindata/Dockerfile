# Etapa 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor Nginx para el Front
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# Copiamos TODO lo que haya en la carpeta de salida del build
# Si tu proyecto es Angular 18, suele estar en dist/heroes-mindata/browser
COPY --from=build /app/dist/heroes-mindata/browser /usr/share/nginx/html
# Copiamos una configuración básica de Nginx para manejar rutas de Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
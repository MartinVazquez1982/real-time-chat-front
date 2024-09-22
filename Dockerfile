# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Definir un argumento de construcción para la URL de la API
ARG VITE_API_REAL_TIME_CHAT_URL="http://localhost:3000"

# Copiar los archivos de proyecto a /app
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Configurar la variable de entorno para Vite
ENV VITE_API_REAL_TIME_CHAT_URL=${VITE_API_REAL_TIME_CHAT_URL}

# Compilar la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar el build generado por Vite a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

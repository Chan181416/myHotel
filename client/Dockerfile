ENV NODE_OPTIONS=--max_old_space_size=4096
ENV VITE_DISABLE_ROLLUP_NATIVE=1
# ---------- Build stage ----------
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV VITE_CJS_IGNORE_WARNING=true

RUN npm run build

# ---------- Production stage ----------
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
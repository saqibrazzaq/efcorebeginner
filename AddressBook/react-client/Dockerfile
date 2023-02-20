FROM node:alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 80
RUN npm run build

FROM nginx:alpine as production
ENV NODE_ENV production
WORKDIR /app
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
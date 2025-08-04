FROM node:22-alpine AS development
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN touch cert/local-key.pem cert/local.pem
RUN npm install --include=optional
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "dev"]

FROM node:22-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY .npmrc /usr/src/app/
RUN npm install --only=production
EXPOSE 8080
USER node
CMD ["npm", "run", "start"]

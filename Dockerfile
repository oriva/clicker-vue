FROM node:22-alpine AS development
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package.json ./
# RUN touch cert/local-key.pem cert/local.pem
RUN npm install --include=optional
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]

FROM node:22-alpine AS production
ENV NODE_ENV=production/Users/alexanderdev/Desktop/sites/frontend-next/docker-compose-local.yml
WORKDIR /usr/src/app
COPY .npmrc /usr/src/app/
RUN npm install --only=production
USER node
CMD ["npm", "run", "start"]

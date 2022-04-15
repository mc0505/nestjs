# FROM node:alpine

# USER node

# ARG PORT=3000

# RUN mkdir -p /usr/src/app

# WORKDIR /usr/src/app

# COPY . .
# RUN npm install && npm cache clean --force
# RUN npm run build

# EXPOSE $PORT

# CMD [ "npm", "run", "start" ]

FROM node:16.14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16.14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

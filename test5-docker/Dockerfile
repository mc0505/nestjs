# FROM node:12.19.0-alpine3.9 As development

# WORKDIR /usr/src/app

# Copy package*.json ./

# run npm install -g rimraf

# run npm install --only=development 

# Copy . .

# Run npm run build

# FROM node:12.19.0-alpine3.9 as production

# ARG NODE_ENV-production
# ENV NODE_ENV=${NODE_ENV}

# Workdir /usr/src/app

# copy package*.json ./

# run npm install --only=production

# copy . .

# copy --from=development /usr/sec/app/dist ./dist

# CMD ["node", "dist/main"]

FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]


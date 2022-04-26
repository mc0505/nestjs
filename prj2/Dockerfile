FROM node:16.14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

CMD ["node", "dist/main"]

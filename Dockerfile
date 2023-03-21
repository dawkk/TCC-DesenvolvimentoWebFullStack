FROM node:18

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY src/ src/

COPY public/ public/

COPY tsconfig.json tsconfig.json

EXPOSE 3000

CMD ["npm", "start"]
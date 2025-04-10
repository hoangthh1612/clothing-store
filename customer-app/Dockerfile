FROM node:18-alphine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm i -g npm@8.11.0

EXPOSE 3001

# Command to start the app
CMD ["npm", "start"]
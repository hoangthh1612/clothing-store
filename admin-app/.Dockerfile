FROM node:18-alpine

# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000


# run app in dev environment
CMD ["npm", "run", "dev"]
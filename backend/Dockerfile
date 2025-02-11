FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV PORT=5000
ENV MONGO_CONNECT="mongodb+srv://Kunal:Kunal@cluster0.qunea.mongodb.net/Nodejs-Users-Notes?retryWrites=true&w=majority&appName=Cluster0"
ENV JWT_SECRET="my-secret-key"

CMD ["npm", "start"]

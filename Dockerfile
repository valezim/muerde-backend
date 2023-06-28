FROM node:14
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "node", "src/app.js" ]
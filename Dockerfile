FROM node:21-alpine
COPY . .
EXPOSE 10000
CMD ["node", "index.js"]

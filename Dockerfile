FROM node:12

WORKDIR /app/src

COPY ./ /app/src

RUN npm install &&  npm run build && rm node_modules -rf

EXPOSE 3000

CMD ["npm","run","start"]
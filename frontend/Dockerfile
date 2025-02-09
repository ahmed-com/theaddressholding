FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_PUBLIC_API_URL=http://nginx

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]

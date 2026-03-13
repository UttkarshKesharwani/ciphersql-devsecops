FROM node:22-alpine As builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .



# Stage 2 : Production

FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

CMD ["index.js"]
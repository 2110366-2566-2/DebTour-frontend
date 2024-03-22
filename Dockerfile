FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN --mount=type=secret,id=NEXTAUTH_URL \
    export NEXTAUTH_URL=$(cat /run/secrets/NEXTAUTH_URL) && \
    --mount=type=secret,id=NEXTAUTH_SECRET \
    export NEXTAUTH_SECRET=$(cat /run/secrets/NEXTAUTH_SECRET) && \
    --mount=type=secret,id=GOOGLE_CLIENT_ID \
    export GOOGLE_CLIENT_ID=$(cat /run/secrets/GOOGLE_CLIENT_ID) && \
    --mount=type=secret,id=GOOGLE_CLIENT_SECRET \
    export GOOGLE_CLIENT_SECRET=$(cat /run/secrets/GOOGLE_CLIENT_SECRET) && \
    --mount=type=secret,id=BACKEND_URL \
    export BACKEND_URL=$(cat /run/secrets/BACKEND_URL) && \
    npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
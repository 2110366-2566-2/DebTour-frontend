FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Set environment variables from secrets

RUN --mount=type=secret,id=NEXTAUTH_URL \
    export NEXTAUTH_URL=$(cat /run/secrets/NEXTAUTH_URL)

RUN --mount=type=secret,id=NEXTAUTH_SECRET \
    export NEXTAUTH_SECRET=$(cat /run/secrets/NEXTAUTH_SECRET)

RUN --mount=type=secret,id=GOOGLE_CLIENT_ID \
    export GOOGLE_CLIENT_ID=$(cat /run/secrets/GOOGLE_CLIENT_ID)

RUN --mount=type=secret,id=GOOGLE_CLIENT_SECRET \
    export GOOGLE_CLIENT_SECRET=$(cat /run/secrets/GOOGLE_CLIENT_SECRET)

RUN --mount=type=secret,id=BACKEND_URL \
    export BACKEND_URL=$(cat /run/secrets/BACKEND_URL)

RUN echo "NEXTAUTH_URL: $NEXTAUTH_URL"
RUN echo "NEXTAUTH_SECRET: $NEXTAUTH_SECRET"
RUN echo "GOOGLE_CLIENT_ID: $GOOGLE_CLIENT_ID"
RUN echo "GOOGLE_CLIENT_SECRET: $GOOGLE_CLIENT_SECRET"
RUN echo "BACKEND_URL: $BACKEND_URL"
    
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
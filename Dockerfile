ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG BACKEND_URL

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

<<<<<<< HEAD
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV BACKEND_URL=$BACKEND_URL
=======
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
>>>>>>> parent of 16f9822 (fix: set environment variables directly from secrets)

EXPOSE 3000

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
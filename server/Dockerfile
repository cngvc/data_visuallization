FROM node:22-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
COPY tsconfig.json ./

RUN yarn config set disable-self-update-check true && \
  yarn config set strict-ssl true && \
  yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn install --production --frozen-lockfile && \
  yarn global add pm2

RUN mkdir -p /app/logs && \
  chown -R node:node /app/logs && \
  chmod -R 755 /app/logs

COPY --chown=node:node ecosystem.config.js ./

USER node

EXPOSE 4000

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]


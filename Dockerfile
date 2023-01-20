FROM node:18.13-alpine AS builder

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM pierrezemb/gostatic
COPY --from=builder /build/ /srv/http/
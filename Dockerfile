FROM node:20-buster AS builder

WORKDIR /service

RUN apt-get update -y && \
    apt-get install -y openssl

COPY *.json yarn.lock .yarnrc.yml ./
COPY *.npmrc .env ./
COPY *.ts ./
COPY *.js ./
COPY *.vue ./
COPY .yarn .yarn
COPY inngest inngest
COPY layouts layouts
COPY pages pages
COPY prisma prisma
COPY public public
COPY server server
COPY store store
COPY types types
COPY utils utils

RUN yarn install

RUN yarn prisma:migrate:dev && \
    yarn prisma:migrate:generate

EXPOSE 3000

# Build for API. Converts Typescript into Javascript for production
FROM --platform=amd64 node:18-alpine as backendbuild

WORKDIR /backend

COPY /backend/package.json .
COPY /backend/package-lock.json .

RUN npm install

COPY /backend .

RUN npm run build

# Build for React. Converts TSX and React into a static html bundle
FROM --platform=amd64 node:18-alpine as frontendbuild
# FROM --platform=amd64 node:18-alpine as frontendbuild

WORKDIR /frontend

COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm install --legacy-peer-deps

COPY /frontend/ .

RUN npm run build


# Production level Image: Inherits from built api and frontend images
FROM --platform=amd64 node:18-alpine as production
# FROM --platform=amd64 node:18-alpine as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG SCHEMA=
ENV SCHEMA=${SCHEMA}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG JWT_SECRET=strongpassword
ENV JWT_SECRET=${JWT_SECRET}

ARG JWT_EXPIRES_IN=604800
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

ARG VITE_GOOGLE_API_KEY
ENV VITE_GOOGLE_API_KEY=${VITE_GOOGLE_API_KEY}

ARG AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}

ARG AWS_BUCKET_NAME
ENV AWS_BUCKET_NAME=${AWS_BUCKET_NAME}

ARG AWS_SECRET_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}


WORKDIR /api

COPY /backend/package.json .
COPY /backend/package-lock.json .

COPY /backend/.sequelizerc .


COPY --from=frontendbuild /frontend/dist ./dist/react-vite
COPY --from=frontendbuild /frontend/public ./dist/react-vite/public

RUN npm install --only=production

COPY --from=backendbuild /backend/dist ./dist

EXPOSE 8000
CMD [ "npm", "start"]

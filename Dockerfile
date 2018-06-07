FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY . .

# Inject secrets into ENV
ARG GITLAB_API_URL='https://gitlab.com/api/v4/'
ENV GITLAB_API_URL=$GITLAB_API_URL

ARG GITLAB_ACCESS_KEY='asdf'
ENV GITLAB_ACCESS_KEY=$GITLAB_ACCESS_KEY

ENV PORT=8080

EXPOSE 8080
CMD [ "npm", "start" ]

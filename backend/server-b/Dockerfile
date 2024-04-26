# This is where you define the image for
# the server B which processes the orders.

# You should then use Noje image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

#FROM node:version...

FROM node:16
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "utils/wait-for-it.sh", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 3002
RUN chown -R node /usr/src/app
USER root
COPY ./utils/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
USER node
#CMD sh -c 'npm start'
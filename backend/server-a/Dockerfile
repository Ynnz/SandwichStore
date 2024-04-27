FROM node:16
# Ensures that the app runs in production mode for better performance
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "utils/wait-for-it.sh", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 3001
RUN chown -R node /usr/src/app
# Switch to root user so copying or chmod doesn't cause permission errors
USER root
COPY ./utils/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
# Switch back to node user
USER node
# This gets overwritten by the docker-compose file
# npm run init-db is a custom script that initializes the database if it's empty
CMD sh -c 'npm run init-db && npm start'
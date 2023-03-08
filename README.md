# HasuraRabbitMQ
Proof of concept for hasura subscriptions triggered by RabbitMQ 

## Client app
In the client folder
Run `yarn` to install dependencies
Run `yarn start` to launch the react app

## Hasura
In the hasura folder
Run `docker-compose up` to start the container
Run in order to update the database schema:
  - `hasura metadata apply`
  - `hasura migrate apply`
  - `hasura metadata reload`
Run `hasura console` to open the console in the browser

## RabbitMQ
In the rabbitmq folder
Run `docker-compose up` to start the container

## NodeJS Pub/Sub functions
In the node-functions folder
Run `node receive_logs.js` to listen to the Pub/Sub
Run `node emit_logs.js` to send a message to the Pub/Sub

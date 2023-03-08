# HasuraRabbitMQ
Proof of concept for hasura subscriptions triggered by RabbitMQ <br/>

## Client app
In the client folder <br/>
Run `yarn` to install dependencies <br/>
Run `yarn start` to launch the react app. 

## Hasura
In the hasura folder <br/>
Run `docker-compose up` to start the container <br/>
Run in order to update the database schema:  
  - `hasura metadata apply`
  - `hasura migrate apply`
  - `hasura metadata reload`
Run `hasura console` to open the console in the browser. 

## RabbitMQ
In the rabbitmq folder <br/>
Run `docker-compose up` to start the container <br/>

## NodeJS Pub/Sub functions
In the node-functions folder <br/>
Run `node receive_logs.js` to listen to the Pub/Sub <br/>
Run `node emit_logs.js` to send a message to the Pub/Sub. 

var amqp = require('amqplib/callback_api');
var {createClient} = require("@urql/core");
var fetch = require("isomorphic-unfetch");

const client = createClient({
    url: "http://localhost:8080/v1/graphql",
    requestPolicy: 'network-only',
    fetchOptions: {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
    },
    fetch,
})

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'logs';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg) {
        if(msg.content) {
            send(msg.content.toString());
            console.log(" [x] %s", msg.content.toString());
          }
      }, {
        noAck: true
      });
    });
  });
});

const sendMsg = `
    mutation addMessage($content: String) {
        insert_messages_one(object: {content: $content}) {
            id
        }
    }
`

async function send(msg) {
    const result = await client
        .mutation(sendMsg, {
            content: msg,
        })
        .toPromise()

    if (result.error) {
        console.log(result.error);
    }
}
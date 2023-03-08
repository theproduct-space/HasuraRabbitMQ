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
            let obj = JSON.parse(msg.content)
            send(obj);
            console.log(" [x] %s", obj.content.toString());
          }
      }, {
        noAck: true
      });
    });
  });
});

const sendMsg = `
    mutation addMessage($user_sender_id: Int, $user_to_id: Int, $content: String) {
        insert_messages_one(
            object: {
                user_sender_id: $user_sender_id
                user_to_id: $user_to_id
                content: $content
            }
        ) {
            id
        }
    }
`

async function send({user_sender_id, user_to_id, content}) {
    const result = await client
        .mutation(sendMsg, {
            user_sender_id,
            user_to_id,
            content
        })
        .toPromise()

    if (result.error) {
        console.log(result.error);
    }
}
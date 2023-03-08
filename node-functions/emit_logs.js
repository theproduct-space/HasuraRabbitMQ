var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'logs';
    var content = process.argv.slice(2).join(' ') || 'Hello World!';
    let ids = new Array(1, 2, 3);
    var user_sender_id = ids.splice(Math.floor(Math.random() * ids.length), 1)[0];
    var user_to_id = ids.splice(Math.floor(Math.random() * ids.length), 1)[0];
    let obj = {user_sender_id, user_to_id, content};

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });
    channel.publish(exchange, '', Buffer.from(JSON.stringify(obj)));
    console.log(" [x] Sent %s", content);
  });

  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});
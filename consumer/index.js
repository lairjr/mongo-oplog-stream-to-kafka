const Kafka = require('no-kafka');
const brokers = "kafka:9092";

const consumer = new Kafka.GroupConsumer({
  connectionString: brokers,
});

const dataHandler = function (messageSet, topic, partition) {
  return Promise.all(messageSet.map((m) => {
    const doc = JSON.parse(m.message.value.toString('utf8'));
    console.log('Receive', topic, partition, m.offset, doc);
    // commit offset
    return consumer.commitOffset({topic: topic, partition: partition, offset: m.offset, metadata: 'optional'});
  }));
};

const strategies = [{
  subscriptions: ['kittens'],
  handler: dataHandler
}];

consumer.init(strategies);

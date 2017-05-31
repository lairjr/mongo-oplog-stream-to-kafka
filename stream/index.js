const kafkaProducer = require('./kafka-producer');
const kafkaConsumer = require('./kafka-consumer');
const kafkaProducerHandlers = require('./kafka-producer-handlers');
const kafkaConsumerHandlers = require('./kafka-consumer-handlers');

const consumeStrategies = [{
  subscriptions: ['kittens'],
  handler: kafkaConsumerHandlers.onData
}];

kafkaConsumer.init(consumeStrategies);

kafkaProducer.init().then(
  kafkaProducerHandlers.onInit
);

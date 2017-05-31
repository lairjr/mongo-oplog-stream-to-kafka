const kafkaProducer = require('./kafka-producer');
const kafkaConsumer = require('./kafka-consumer');
const kafkaProducerHandlers = require('./kafka-producer-handlers');
const kafkaConsumerHandlers = require('./kafka-consumer-handlers');

kafkaProducer.init().then(
  kafkaProducerHandlers.onInit
);

const consumeStrategies = [{
  subscriptions: ['kittens'],
  handler: kafkaConsumerHandlers.onData
}];

kafkaConsumer.init(consumeStrategies);

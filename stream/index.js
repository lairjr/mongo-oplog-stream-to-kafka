const kafkaProducer = require('./kafka-producer');
const kafkaProducerHandlers = require('./kafka-producer-handlers');

kafkaProducer.init().then(
  kafkaProducerHandlers.onInit
);

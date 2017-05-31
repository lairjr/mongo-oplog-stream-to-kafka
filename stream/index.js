const kafkaProducer = require('./kafka-producer');
const kafkaHandlers = require('./kafka-handlers');

kafkaProducer.init().then(
  kafkaHandlers.onInit
);

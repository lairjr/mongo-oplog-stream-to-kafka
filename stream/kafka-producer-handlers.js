const mongoose = require('mongoose');
const mongoHandlers = require('./mongo-handlers');

const kafkaProducerHandlers = {
  onInit: () => {
    const oplogMongodbUri = 'mongodb/local';

    mongoose.connect(oplogMongodbUri, {
      poolSize: 10,
      socketOptions: { keepAlive: 250 },
    }).then(mongoHandlers.onConnect)
      .catch(mongoHandlers.onConnectionError);
  },
  onInitError: (error) => {
    console.log('Kafka producer init error.', error);
  }
}

module.exports = kafkaProducerHandlers;

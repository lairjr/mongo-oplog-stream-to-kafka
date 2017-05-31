const kafkaConsumer = require('./kafka-consumer');

const kafkaConsumerHandlers = {
  onData: (messageSet, topic, partition) => {
    return Promise.all(messageSet.map((m) => {
      const doc = JSON.parse(m.message.value.toString('utf8'));
      console.log('Received data from kafka', topic, partition, m.offset, doc.o._id);
      // commit offset
      return kafkaConsumer.commitOffset({topic: topic, partition: partition, offset: m.offset, metadata: 'optional'});
    }));
  }
}

module.exports = kafkaConsumerHandlers;

const kafkaProducer = require('./kafka-producer');

const shouldStream = (data) => {
  return data.ns !== '';
};

const onData = (data) => {
  if (shouldStream(data)) {
    const topic = 'kittens';

    kafkaProducer.send({
      topic: topic,
      partition: 0,
      message: {
        value: data
      }
    }).then(() => {
      console.log('Sent to kafka', data);
    });
  }
};

const oplogHandlers = {
  onData: onData,
  onErro: (error) => {
    console.log('Oplog error: ', error);
  },
  onClose: () => {
    console.log('Oplog connection has been closed');
  }
};

module.exports = oplogHandlers;

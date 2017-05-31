const kafkaProducer = require('./kafka-producer');

const oplogHandlers = {
  onData: (data) => {
    const topic = "kittens";

    kafkaProducer.send({
      topic: topic,
      partition: 0,
      message: {
        value: data
      }
    }).then(() => {
      console.log('Sent to kafka');
    });
  },
  onErro: (error) => {
    console.log('Oplog error: ', error);
  },
  onClose: () => {
    console.log('Oplog connection has been closed');
  }
};

module.exports = oplogHandlers;

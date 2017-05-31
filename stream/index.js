const mongoose = require('mongoose');
const kafkaProducer = require('./kafka-producer');

const oplogMongodbUri = 'mongodb/local';
const topic = "kittens";

const connectToMongo = () => {
  mongoose.connect(oplogMongodbUri, {
    poolSize: 10,
    socketOptions: { keepAlive: 250 },
  }).then(
    tailOplog
  ).catch((err) => {
    console.log(err);
  });
};

const tailOplog = () => {
  const options = {
    tailable: true,
    awaitdata: true
  };

  const stream = mongoose.connection.db.collection('oplog.rs').find({}, options);

  stream.on('data', processDoc)
  .on('error', function (error){
      console.log(error);
  }).on('close', function () {
      console.log('closed');
  });
};

const processDoc = (doc) => {
  console.log('process...', doc);

  kafkaProducer.send({
    topic: topic,
    partition: 0,
    message: {
      doc: doc
    }
  }).then(() => {
    console.log('Sent to kafka');
  });
};

kafkaProducer.init().then(
  connectToMongo
);

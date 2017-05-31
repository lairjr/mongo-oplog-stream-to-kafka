const mongoose = require('mongoose');
const oplogHandlers = require('./oplog-handlers');

const tailOplog = () => {
  const options = {
    tailable: true,
    awaitdata: true
  };

  const stream = mongoose.connection.db.collection('oplog.rs').find({}, options);

  stream.on('data', oplogHandlers.onData)
        .on('error', oplogHandlers.onError)
        .on('close', oplogHandlers.onClose);
}

const mongoHandlers = {
  onConnect: () => {
    tailOplog();
  },
  onConnectionError: (error) => {
    console.log('Mongo connection error', error);
  }
}

module.exports = mongoHandlers;

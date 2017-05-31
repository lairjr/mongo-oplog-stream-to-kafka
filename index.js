const mongoose = require('mongoose');

const oplogMongodbUri = 'mongodb/local';

mongoose.connect(oplogMongodbUri, {
  poolSize: 10,
  socketOptions: { keepAlive: 250 },
}).then(() => {
  console.log('connected');
}).catch((err) => {
  console.log(err);
});

const mongoose = require('mongoose');

const oplogMongodbUri = 'mongodb/local';

mongoose.connect(oplogMongodbUri, {
  poolSize: 10,
  socketOptions: { keepAlive: 250 },
}).then(() => {
  const options = {
    tailable: true,
    awaitdata: true
  };

  const stream = mongoose.connection.db.collection('oplog.rs').find({}, options);

  stream.on('data', function(doc){
      console.log('>>>>', doc);
  }).on('error', function (error){
      console.log(error);
  }).on('close', function () {
      console.log('closed');
  });
}).catch((err) => {
  console.log(err);
});

const mongoose = require('mongoose');

const oplogMongodb = 'mongodb/test';

mongoose.connect(oplogMongodb, {
  poolSize: 10,
  socketOptions: { keepAlive: 250 },
}).then(() => {
  insertDoc();

  setInterval(insertDoc, 1000);
});

const insertDoc = () => {
  mongoose.connection.db.collection('kittens').insert({ name: 'cat' });
  console.log('kitten inserted');
};

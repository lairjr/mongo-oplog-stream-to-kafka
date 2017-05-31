const Kafka = require('no-kafka');

const brokers = "kafka:9092";

module.exports = new Kafka.Producer({
  connectionString: brokers
});

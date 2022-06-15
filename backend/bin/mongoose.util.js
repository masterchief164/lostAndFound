const mongoose = require('mongoose');


mongoose.Promise = Promise;

const mongoUri = process.env.MONGODB_URL;

mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.on('error', (e) => {
  if (e.message.code === 'ETIMEDOUT') {
    console.log(e);
  }
  console.log(e);
});

mongoose.connection.once('open', () => {
  console.log(`MongoDB successfully connected`);
});

module.exports = mongoose;

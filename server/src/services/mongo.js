const mongoose = require('mongoose');

// Update below to match your own MongoDB connection string.
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('error tat naydl')
  });

  async function mogoConnect(){
    await mongoose.connect(MONGO_URL);
  }

  async function mongoDisconnect(){
      await mongoose.disconnect();
  }

  module.exports = {
    mogoConnect,
    mongoDisconnect
  }